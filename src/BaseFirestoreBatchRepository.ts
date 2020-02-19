import { WriteBatch, CollectionReference } from '@google-cloud/firestore';
import { IEntity, WithOptionalId, Instantiable } from './types';
import { getMetadataStorage, CollectionMetadata } from './MetadataStorage';
import { serializeEntity } from './utils';

export class BaseFirestoreBatchRepository<T extends IEntity> {
  protected serializer: (item: T) => Object;
  protected colMetadata: CollectionMetadata;
  protected subColMetadata: CollectionMetadata[];
  protected collectionPath: string;
  protected colRef: CollectionReference;

  constructor(
    protected batch: WriteBatch,
    protected entity: Instantiable<T>,
    collectionPath?: string
  ) {
    const {
      getCollection,
      getSubCollection,
      getSubCollectionsFromParent,
      firestoreRef,
    } = getMetadataStorage();

    this.colMetadata = getSubCollection(entity) || getCollection(entity);
    this.subColMetadata = getSubCollectionsFromParent(this.colMetadata.entity);

    this.collectionPath = collectionPath || this.colMetadata.name;
    this.colRef = firestoreRef.collection(this.collectionPath);

    this.serializer = (item: T) =>
      serializeEntity<T>(item, this.subColMetadata);
  }

  create = (item: WithOptionalId<T>) => {
    const doc = item.id ? this.colRef.doc(item.id) : this.colRef.doc();
    if (!item.id) {
      item.id = doc.id;
    }
    const serialized = this.serializer(item as T);
    this.batch.set(doc, serialized);
  };

  update = (item: T) => {
    this.batch.update(this.colRef.doc(item.id), this.serializer(item));
  };

  delete = (item: T) => {
    this.batch.delete(this.colRef.doc(item.id), this.serializer(item));
  };
}
