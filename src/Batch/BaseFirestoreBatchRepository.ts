import { collection, CollectionReference, doc } from '@firebase/firestore';
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
    this.colRef = collection(firestoreRef, this.path);
    this.config = config;
  }

  create = (item: WithOptionalId<T>) => {
    const newDoc = item.id ? doc(this.colRef, item.id) : doc(this.colRef);
    if (!item.id) {
      item.id = newDoc.id;
    }

    this.batch.add(
      'create',
      item as T,
      newDoc,
      this.colMetadata,
      this.config.validateModels,
      this.config.validatorOptions
    );
  };

  update = (item: T) => {
    this.batch.add(
      'update',
      item,
      doc(this.colRef, item.id),
      this.colMetadata,
      this.config.validateModels
    );
  };

  delete = (item: T) => {
    this.batch.add(
      'delete',
      item,
      doc(this.colRef, item.id),
      this.colMetadata,
      this.config.validateModels
    );
  };
}
