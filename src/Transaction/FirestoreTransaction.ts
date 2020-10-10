import { Transaction } from '@google-cloud/firestore';
import { TransactionRepository } from './BaseFirestoreTransactionRepository';
import { getMetadataStorage } from '../MetadataUtils';
import { IEntity, EntityConstructorOrPath, IFirestoreTransaction } from '../types';

const metadataStorage = getMetadataStorage();

export class FirestoreTransaction implements IFirestoreTransaction {
  constructor(private transaction: Transaction) {}

  getRepository<T extends IEntity = IEntity>(entityOrConstructor: EntityConstructorOrPath<T>) {
    if (!metadataStorage.firestoreRef) {
      throw new Error('Firestore must be initialized first');
    }

    return new TransactionRepository<T>(this.transaction, entityOrConstructor);
  }
}
