import { CollectionReference, WriteBatch } from '@google-cloud/firestore';
import { IEntity, WithOptionalId } from './types';

// TODO: Eventually I'll abstract this class since right now is tied to
// WriteBatch class from firestore
export class FirestoreBatchRepository<T extends IEntity> {
  private batch: WriteBatch;

  constructor(
    private collection: CollectionReference,
    private serializer: Function
  ) {
    this.batch = collection.firestore.batch();
  }

  create = (item: WithOptionalId<T>) => {
    const doc = item.id ? this.collection.doc(item.id) : this.collection.doc();
    if (!item.id) {
      item.id = doc.id;
    }
    const serialized = this.serializer(item);
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
