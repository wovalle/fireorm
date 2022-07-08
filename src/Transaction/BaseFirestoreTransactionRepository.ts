/// JMULEIN/FreddieMercurial WIP
import {
  doc,
  DocumentData,
  query,
  Query,
  Transaction,
  where,
  WhereFilterOp,
} from '@firebase/firestore';

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
    // WTF TODO
    const docQuery = queries.reduce<Query>(
      (accumulator: Query<DocumentData>, cur: IFireOrmQueryLine) => {
        const op = cur.operator as WhereFilterOp;
        const newConstraint = where(cur.prop, op, cur.val);
        return query(accumulator, newConstraint);
      },
      this.firestoreColRef
    );
    this.transaction.get(docQuery);

    const result = await getDocs(docQuery).then(c =>
      this.extractTFromColSnap(result, this.transaction, this.tranRefStorage)
    );

    const values = (await snapshot).values();
    return Promise.resolve(values);
  }

  findById(id: string) {
    const query = doc(this.firestoreColRef, id);

    return this.transaction
      .get(query)
      .then(c =>
        c.exists() ? this.extractTFromDocSnap(c, this.transaction, this.tranRefStorage) : null
      );
  }

  async create(item: WithOptionalId<T>): Promise<T> {
    if (this.config.validateModels) {
      const errors = await this.validate(item as T);

      if (errors.length) {
        throw errors;
      }
    }

    const firestoreDoc = item.id ? doc(this.firestoreColRef, item.id) : doc(this.firestoreColRef);

    if (!item.id) {
      item.id = firestoreDoc.id;
    }

    this.transaction.set(firestoreDoc, this.toSerializableObject(item as T));
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

    this.transaction.update(
      doc(this.firestoreColRef, item.id),
      this.toSerializableObject(item) as Record<string, never>
    );

    return item;
  }

  async delete(id: string): Promise<void> {
    this.transaction.delete(doc(this.firestoreColRef, id));
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
