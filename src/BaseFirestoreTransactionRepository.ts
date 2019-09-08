import { CollectionReference, Transaction } from '@google-cloud/firestore';

import {
  IEntity,
  IFireOrmQueryLine,
  WithOptionalId,
  IQueryBuilder,
  IRepository,
} from './types';

import { AbstractFirestoreRepository } from './AbstractFirestoreRepository';

export class TransactionRepository<T extends IEntity>
  extends AbstractFirestoreRepository<T>
  implements IRepository<T> {
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

  limit(): IQueryBuilder<T> {
    throw new Error('`limit` is not available for transaction repositories');
  }

  orderByAscending(): IQueryBuilder<T> {
    throw new Error(
      '`orderByAscending` is not available for transaction repositories'
    );
  }

  orderByDescending(): IQueryBuilder<T> {
    throw new Error(
      '`orderByDescending` is not available for transaction repositories'
    );
  }
}
