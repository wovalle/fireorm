import { Transaction } from '@google-cloud/firestore';
import { TransactionRepository } from './BaseFirestoreTransactionRepository';
import { getMetadataStorage } from '../MetadataStorage';
import { IEntity, Constructor } from '../types';

const metadataStorage = getMetadataStorage();

export class FirestoreTransaction {
  constructor(private transaction: Transaction) {}

  getRepository<T extends IEntity>(entity: Constructor<T>) {
    if (!metadataStorage.firestoreRef) {
      throw new Error('Firestore must be initialized first');
    }

    return new TransactionRepository<T>(this.transaction, entity);
  }
}
