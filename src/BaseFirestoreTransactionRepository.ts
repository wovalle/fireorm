import {
  CollectionReference,
  Transaction,
  WhereFilterOp,
} from '@google-cloud/firestore';

import {
  IEntity,
  IFireOrmQueryLine,
  WithOptionalId,
  IQueryBuilder,
  IRepository,
  FirestoreCollectionType,
} from './types';

import { AbstractFirestoreRepository } from './AbstractFirestoreRepository';

export class TransactionRepository<T extends IEntity>
  extends AbstractFirestoreRepository<T>
  implements IRepository<T> {
  constructor(
    private collection: CollectionReference,
    private transaction: Transaction,
    entityConstructor: Function
  ) {
    super(entityConstructor);
  }

  execute(queries: IFireOrmQueryLine[]): Promise<T[]> {
    const query = queries.reduce((acc, cur) => {
      const op = cur.operator as WhereFilterOp;
      return acc.where(cur.prop, op, cur.val);
    }, this.collection);

    return this.transaction.get(query).then(this.extractTFromColSnap);
  }

  findById(id: string): Promise<T> {
    const query = this.collection.doc(id);
    return this.transaction.get(query).then(this.extractTFromDocSnap);
  }

  async create(item: WithOptionalId<T>): Promise<T> {
    if (item.id) {
      const found = await this.findById(item.id);
      if (found) {
        return Promise.reject(
          new Error(`A document with id ${item.id} already exists.`)
        );
      }
    }

    const doc = item.id ? this.collection.doc(item.id) : this.collection.doc();

    if (!item.id) {
      item.id = doc.id;
    }

    await this.transaction.set(doc, this.toSerializableObject(item as T));

    if (this.collectionType === FirestoreCollectionType.collection) {
      this.initializeSubCollections(item as T);
    }

    return item as T;
  }

  async update(item: T): Promise<T> {
    const query = this.collection.doc(item.id);
    await this.transaction.update(query, this.toSerializableObject(item));
    return item;
  }

  async delete(id: string): Promise<void> {
    await this.transaction.delete(this.collection.doc(id));
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
