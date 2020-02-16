import { CollectionReference, WriteBatch } from '@google-cloud/firestore';
import { IEntity, WithOptionalId, Instantiable } from './types';
import { getMetadataStorage, CollectionMetadata } from './MetadataStorage';
import { serializeEntity } from './utils';

// TODO: Eventually I'll abstract this class since right
// now is tied to WriteBatch class from firestore
export class FirestoreBatchRepository<T extends IEntity> {
  private batch: WriteBatch;
  private serializer: (item: T) => Object;
  private colMetadata: CollectionMetadata;
  private subColMetadata: CollectionMetadata[];

  constructor(
    private collection: CollectionReference,
    private entity: Instantiable<T>
  ) {
    this.batch = collection.firestore.batch();

    const {
      getCollection,
      getSubCollection,
      getSubCollectionsFromParent,
    } = getMetadataStorage();

    this.colMetadata = getSubCollection(entity) || getCollection(entity);
    this.subColMetadata = getSubCollectionsFromParent(this.colMetadata.entity);
    this.serializer = (item: T) =>
      serializeEntity<T>(item, this.subColMetadata);
  }

  create = (item: WithOptionalId<T>) => {
    const doc = item.id ? this.collection.doc(item.id) : this.collection.doc();
    if (!item.id) {
      item.id = doc.id;
    }
    const serialized = this.serializer(item as T);
    this.batch.set(doc, serialized);
  };

  update = (item: T) => {
    this.batch.update(this.collection.doc(item.id), this.serializer(item));
  };

  delete = (item: T) => {
    this.batch.delete(this.collection.doc(item.id), this.serializer(item));
  };

  commit = () => {
    return this.batch.commit();
  };
}
