import { CollectionReference, Transaction } from '@google-cloud/firestore';

import {
  IEntity,
  IQueryExecutor,
  IWherePropParam,
  IFirestoreVal,
  IFireOrmQueryLine,
  ITransactionQueryBuilder,
  ITransactionRepository,
  WithOptionalId,
} from './types';

import { AbstractFirestoreRepository } from './AbstractFirestoreRepository';
import QueryBuilder from './QueryBuilder';

export class TransactionRepository<T extends IEntity>
  extends AbstractFirestoreRepository<T>
  implements
    ITransactionRepository<T>,
    ITransactionQueryBuilder<T>,
    IQueryExecutor<T> {
  constructor(
    private collection: CollectionReference,
    private transaction: Transaction,
    private entityConstructor: Function
  ) {
    super(entityConstructor);
  }

  execute(queries: IFireOrmQueryLine[]): Promise<T[]> {
    throw new Error('Method not implemented.');
  }

  whereEqualTo(prop: IWherePropParam<T>, val: IFirestoreVal): QueryBuilder<T> {
    return new QueryBuilder<T>(this).whereEqualTo(prop, val);
  }

  whereGreaterThan(
    prop: IWherePropParam<T>,
    val: IFirestoreVal
  ): QueryBuilder<T> {
    return new QueryBuilder<T>(this).whereGreaterThan(prop, val);
  }

  whereGreaterOrEqualThan(
    prop: IWherePropParam<T>,
    val: IFirestoreVal
  ): QueryBuilder<T> {
    return new QueryBuilder<T>(this).whereGreaterOrEqualThan(prop, val);
  }

  whereLessThan(prop: IWherePropParam<T>, val: IFirestoreVal): QueryBuilder<T> {
    return new QueryBuilder<T>(this).whereLessThan(prop, val);
  }

  whereLessOrEqualThan(
    prop: IWherePropParam<T>,
    val: IFirestoreVal
  ): QueryBuilder<T> {
    return new QueryBuilder<T>(this).whereLessOrEqualThan(prop, val);
  }

  whereArrayContains(
    prop: IWherePropParam<T>,
    val: IFirestoreVal
  ): QueryBuilder<T> {
    return new QueryBuilder<T>(this).whereArrayContains(prop, val);
  }

  find(): Promise<T[]> {
    throw new Error('Method not implemented.');
  }

  findById(id: string): Promise<T> {
    const query = this.collection.doc(id);
    return this.transaction.get(query).then(this.extractTFromDocSnap);
  }

  create(item: WithOptionalId<T>): Promise<T> {
    throw new Error('Method not implemented.');
  }

  async update(item: T): Promise<T> {
    const query = this.collection.doc(item.id);
    await this.transaction.update(query, this.toSerializableObject(item));
    return item;
  }

  delete(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
