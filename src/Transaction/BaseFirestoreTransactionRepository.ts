import { Query, Transaction, WhereFilterOp } from '@google-cloud/firestore';

import {
  IEntity,
  IFireOrmQueryLine,
  WithOptionalId,
  IQueryBuilder,
  ITransactionRepository,
  EntityConstructorOrPath,
  ITransactionReferenceStorage,
} from '../types';

import { AbstractFirestoreRepository } from '../AbstractFirestoreRepository';
export class TransactionRepository<T extends IEntity>
  extends AbstractFirestoreRepository<T>
  implements ITransactionRepository<T>
{
  constructor(
    pathOrConstructor: EntityConstructorOrPath<T>,
    private transaction: Transaction,
    private tranRefStorage: ITransactionReferenceStorage
  ) {
    super(pathOrConstructor);
    this.transaction = transaction;
    this.tranRefStorage = tranRefStorage;
  }

  async execute(queries: IFireOrmQueryLine[]): Promise<T[]> {
    const query = queries.reduce<Query>((acc, cur) => {
      const op = cur.operator as WhereFilterOp;
      return acc.where(cur.prop, op, cur.val);
    }, this.firestoreColRef);

    return this.transaction
      .get(query)
      .then(c => this.extractTFromColSnap(c, this.transaction, this.tranRefStorage));
  }

  findById(id: string) {
    const query = this.firestoreColRef.doc(id);

    return this.transaction
      .get(query)
      .then(c =>
        c.exists ? this.extractTFromDocSnap(c, this.transaction, this.tranRefStorage) : null
      );
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
    this.initializeSubCollections(item as T, this.transaction, this.tranRefStorage);

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
