import {
  CollectionReference,
  Transaction,
  DocumentSnapshot,
  QuerySnapshot,
} from '@google-cloud/firestore';
import {
  IRepository,
  IEntity,
  IQueryExecutor,
  IQueryBuilder,
  IWherePropParam,
  IFirestoreVal,
  IFireOrmQueryLine,
} from './types';
import QueryBuilder from './QueryBuilder';
import { plainToClass } from 'class-transformer';

type OmitedKeys = 'limit' | 'orderByAscending' | 'orderByDescending';
type ITransactionRepository<T extends IEntity> = Omit<
  IRepository<T>,
  OmitedKeys
>;

type ITransactionQueryBuilder<T extends IEntity> = Omit<
  IQueryBuilder<T>,
  OmitedKeys
>;

export class TransactionRepository<T extends IEntity>
  implements
    ITransactionRepository<T>,
    ITransactionQueryBuilder<T>,
    IQueryExecutor<T> {
  constructor(
    private collection: CollectionReference,
    private transaction: Transaction,
    private entityConstructor: Function
  ) {}

  private transformFirestoreTypes = (obj: T): T => {
    Object.keys(obj).forEach(key => {
      if (!obj[key]) return;
      if (typeof obj[key] === 'object' && 'toDate' in obj[key]) {
        obj[key] = obj[key].toDate();
      } else if (obj[key].constructor.name === 'GeoPoint') {
        const { latitude, longitude } = obj[key];
        obj[key] = { latitude, longitude };
      } else if (typeof obj[key] === 'object') {
        this.transformFirestoreTypes(obj[key]);
      }
    });

    return obj;
  };

  private extractTFromDocSnap = (doc: DocumentSnapshot): T => {
    if (!doc.exists) {
      return null;
    }

    // tslint:disable-next-line:no-unnecessary-type-assertion
    const entity = plainToClass(
      this.entityConstructor as any,
      this.transformFirestoreTypes(doc.data() as T)
    ) as T;

    // TODO: initialize subcollections
    // if (this.collectionType === FirestoreCollectionType.collection) {
    //   this.initializeSubCollections(entity);
    // }
    return entity;
  };

  private extractTFromColSnap = (q: QuerySnapshot): T[] => {
    return q.docs.map(this.extractTFromDocSnap);
  };

  private toSerializableObject = (obj: T): Object => {
    // this.subColMetadata.forEach(scm => {
    //   delete obj[scm.propertyKey];
    // });
    return { ...obj };
  };

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

  create(
    item: Pick<T, Exclude<keyof T, 'id'>> & Partial<Pick<T, 'id'>>
  ): Promise<T> {
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
