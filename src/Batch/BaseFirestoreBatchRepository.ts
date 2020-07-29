import { CollectionReference } from '@google-cloud/firestore';
import { IEntity, WithOptionalId, Constructor } from '../types';
import {
  getMetadataStorage,
  MetadataStorageConfig,
  FullCollectionMetadata,
} from '../MetadataStorage';
import { FirestoreBatchUnit } from './FirestoreBatchUnit';

export class BaseFirestoreBatchRepository<T extends IEntity> {
  protected colMetadata: FullCollectionMetadata;
  protected colRef: CollectionReference;
  protected config: MetadataStorageConfig;

  constructor(
    protected batch: FirestoreBatchUnit,
    protected entity: Constructor<T>,
    collectionPath?: string
  ) {
    const { getCollection, firestoreRef, config } = getMetadataStorage();

    this.colMetadata = getCollection(entity);
    this.colRef = firestoreRef.collection(collectionPath || this.colMetadata.name);
    this.config = config;
  }

  create = (item: WithOptionalId<T>) => {
    const doc = item.id ? this.colRef.doc(item.id) : this.colRef.doc();
    if (!item.id) {
      item.id = doc.id;
    }

    this.batch.add('create', item as T, doc, this.colMetadata, this.config.validateModels);
  };

  update = (item: T) => {
    this.batch.add(
      'update',
      item,
      this.colRef.doc(item.id),
      this.colMetadata,
      this.config.validateModels
    );
  };

  delete = (item: T) => {
    this.batch.add(
      'delete',
      item,
      this.colRef.doc(item.id),
      this.colMetadata,
      this.config.validateModels
    );
  };
}
