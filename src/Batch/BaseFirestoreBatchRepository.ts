import { CollectionReference } from '@google-cloud/firestore';
import { IEntity, WithOptionalId, IBatchRepository, EntityConstructorOrPath } from '../types';
import { getMetadataStorage } from '../MetadataUtils';
import { MetadataStorageConfig, FullCollectionMetadata } from '../MetadataStorage';
import { FirestoreBatchUnit } from './FirestoreBatchUnit';
import { NoMetadataError } from '../Errors';
export class BaseFirestoreBatchRepository<T extends IEntity> implements IBatchRepository<T> {
  protected colMetadata: FullCollectionMetadata;
  protected colRef: CollectionReference;
  protected config: MetadataStorageConfig;
  protected path: string;

  constructor(
    protected pathOrConstructor: EntityConstructorOrPath<T>,
    protected batch: FirestoreBatchUnit
  ) {
    const { getCollection, firestoreRef, config } = getMetadataStorage();

    const colMetadata = getCollection(pathOrConstructor);

    if (!colMetadata) {
      throw new NoMetadataError(pathOrConstructor);
    }

    this.colMetadata = colMetadata;
    this.path = typeof pathOrConstructor === 'string' ? pathOrConstructor : this.colMetadata.name;
    this.colRef = firestoreRef.collection(this.path);
    this.config = config;
  }

  create = (item: WithOptionalId<T>) => {
    const doc = item.id ? this.colRef.doc(item.id) : this.colRef.doc();
    if (!item.id) {
      item.id = doc.id;
    }

    this.batch.add(
      'create',
      item as T,
      doc,
      this.colMetadata,
      this.config.validateModels,
      this.config.validatorOptions
    );
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
