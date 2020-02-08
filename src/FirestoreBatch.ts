import { getMetadataStorage } from './MetadataStorage';
import { IEntity, Instantiable } from './types';
import { FirestoreBatchRepository } from './BatchFirestoreRepository';
import { CollectionReference } from '@google-cloud/firestore';

const metadataStorage = getMetadataStorage();

export class FirestoreBatch {
  constructor(protected firestoreColRef: CollectionReference) {}

  getRepository<T extends IEntity>(entity: Instantiable<T>) {
    if (!metadataStorage.firestoreRef) {
      throw new Error('Firestore must be initialized first');
    }

    return new FirestoreBatchRepository(this.firestoreColRef, entity);
  }
}
