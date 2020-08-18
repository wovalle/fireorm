import { CollectionReference, Transaction, WhereFilterOp, DocumentReference } from '@google-cloud/firestore';

import {
  IEntity,
  IFireOrmQueryLine,
  WithOptionalId,
  IQueryBuilder,
  IRepository,
  Constructor,
} from '../types';

import { AbstractFirestoreRepository } from '../AbstractFirestoreRepository';
import { getMetadataStorage } from '../MetadataStorage';

export class TransactionRepository<T extends IEntity> extends AbstractFirestoreRepository<T>
  implements IRepository<T> {
  private firestoreColRef: CollectionReference;
  private transaction: Transaction;

  constructor(transaction: Transaction, entity: Constructor<T>) {
    super(entity);
    this.transaction = transaction;

    const { firestoreRef } = getMetadataStorage();

    if (!firestoreRef) {
      throw new Error('Firestore must be initialized first');
    }

    this.firestoreColRef = firestoreRef.collection(this.collectionPath || this.colName);
  }

  execute(queries: IFireOrmQueryLine[]): Promise<T[]> {
    const query = queries.reduce((acc, cur) => {
      const op = cur.operator as WhereFilterOp;
      return acc.where(cur.prop, op, cur.val);
    }, this.firestoreColRef);

    return this.transaction.get(query).then(this.extractTFromColSnap);
  }

  findById(id: string): Promise<T> {
    const query = this.firestoreColRef.doc(id);
    return this.transaction.get(query).then(this.extractTFromDocSnap);
  }

  async create(item: WithOptionalId<T>): Promise<T> {
    if (this.config.validateModels) {
      const errors = await this.validate(item as T);

      if (errors.length) {
        throw errors;
      }
    }

    const doc = item.id ? this.firestoreColRef.doc(item.id) : this.firestoreColRef.doc();

    if (!item.id) {
      item.id = doc.id;
    }

    this.transaction.set(doc, this.toSerializableObject(item as T));

    this.initializeSubCollections(item as T);

    return item as T;
  }

  async update(item: T): Promise<T> {
    if (this.config.validateModels) {
      const errors = await this.validate(item);

      if (errors.length) {
        throw errors;
      }
    }

    const query = this.firestoreColRef.doc(item.id);
    this.transaction.update(query, this.toSerializableObject(item));

    return item;
  }

  async delete(id: string): Promise<void> {
    this.transaction.delete(this.firestoreColRef.doc(id));
  }

  getReference(id: string): DocumentReference {
    return this.firestoreColRef.doc(id);
  }

  limit(): IQueryBuilder<T> {
    throw new Error('`limit` is not available for transactions');
  }

  orderByAscending(): IQueryBuilder<T> {
    throw new Error('`orderByAscending` is not available for transactions');
  }

  orderByDescending(): IQueryBuilder<T> {
    throw new Error('`orderByDescending` is not available for transactions');
  }
}
