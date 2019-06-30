// tslint:disable-next-line:no-import-side-effect
import 'reflect-metadata';
import { plainToClass } from 'class-transformer';

import {
  DocumentSnapshot,
  CollectionReference,
  WhereFilterOp,
  QuerySnapshot,
} from '@google-cloud/firestore';

import QueryBuilder from './QueryBuilder';
import { GetRepository } from './helpers';

import {
  IRepository,
  IFirestoreVal,
  IQueryBuilder,
  FirestoreCollectionType,
  IFireOrmQueryLine,
  IOrderByParams,
  IQueryExecutor,
  IEntity,
} from './types';

import {
  getMetadataStorage,
  CollectionMetadata,
  SubCollectionMetadata,
} from './MetadataStorage';

export default class BaseFirestoreRepository<T extends IEntity>
  implements IRepository<T>, IQueryBuilder<T>, IQueryExecutor<T> {
  public collectionType: FirestoreCollectionType;
  private readonly firestoreColRef: CollectionReference;
  private readonly colMetadata: CollectionMetadata;
  private readonly subColMetadata: SubCollectionMetadata[];

  constructor(colName: string);
  constructor(colName: string, docId: string, subColName: string);

  constructor(
    protected readonly colName: string,
    protected readonly docId?: string,
    protected readonly subColName?: string
  ) {
    const {
      firestoreRef,
      getCollection,
      getSubCollectionsFromParent,
    } = getMetadataStorage();

    if (!firestoreRef) {
      throw new Error('Firestore must be initialized first');
    }

    this.colMetadata = getCollection(this.colName);

    if (!this.colMetadata) {
      throw new Error(`There is no metadata stored for "${this.colName}"`);
    }

    this.subColMetadata = getSubCollectionsFromParent(this.colMetadata.entity);

    if (this.docId) {
      this.collectionType = FirestoreCollectionType.subcollection;
      this.firestoreColRef = firestoreRef
        .collection(this.colName)
        .doc(this.docId)
        .collection(this.subColName);
    } else {
      this.collectionType = FirestoreCollectionType.collection;
      this.firestoreColRef = firestoreRef.collection(this.colName);
    }
  }

  private initializeSubCollections = (entity: T) => {
    this.subColMetadata.forEach(subCol => {
      Object.assign(entity, {
        [subCol.name]: GetRepository(
          subCol.entity as any,
          entity.id,
          subCol.name
        ),
      });
    });
  };

  private extractTFromDocSnap = (doc: DocumentSnapshot): T => {
    if (!doc.exists) {
      return null;
    }

    // tslint:disable-next-line:no-unnecessary-type-assertion
    const entity = plainToClass(
      this.colMetadata.entity as any,
      this.transformFirestoreTypes(doc.data() as T)
    ) as T;

    if (this.collectionType === FirestoreCollectionType.collection) {
      this.initializeSubCollections(entity);
    }

    return entity;
  };

  private extractTFromColSnap = (q: QuerySnapshot): T[] => {
    return q.docs.map(this.extractTFromDocSnap);
  };

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

  // TODO: have a smarter way to do this
  private toObject = (obj: T): Object => {
    return { ...obj };
  };

  findById(id: string): Promise<T> {
    return this.firestoreColRef
      .doc(id)
      .get()
      .then(this.extractTFromDocSnap);
  }

  async create(item: T): Promise<T> {
    if (item.id) {
      const found = await this.findById(item.id);
      if (found) {
        return Promise.reject(
          new Error(`A document with id ${item.id} already exists.`)
        );
      }
    }

    const doc = this.firestoreColRef.doc(item.id || undefined);

    if (!item.id) {
      item.id = doc.id;
    }

    await doc.set(this.toObject(item));

    if (this.collectionType === FirestoreCollectionType.collection) {
      this.initializeSubCollections(item);
    }

    return item;
  }

  async update(item: T): Promise<T> {
    // TODO: handle errors
    await this.firestoreColRef.doc(item.id).update(this.toObject(item));
    return item;
  }

  async delete(id: string): Promise<void> {
    // TODO: handle errors
    await this.firestoreColRef.doc(id).delete();
  }

  limit(limitVal: number): QueryBuilder<T> {
    return new QueryBuilder<T>(this).limit(limitVal);
  }

  orderByAscending(prop: keyof T & string): QueryBuilder<T> {
    return new QueryBuilder<T>(this).orderByAscending(prop);
  }

  orderByDescending(prop: keyof T & string): QueryBuilder<T> {
    return new QueryBuilder<T>(this).orderByDescending(prop);
  }

  find(): Promise<T[]> {
    return new QueryBuilder<T>(this).find();
  }

  execute(
    queries: Array<IFireOrmQueryLine>,
    limitVal?: number,
    orderByObj?: IOrderByParams
  ): Promise<T[]> {
    let query = queries.reduce((acc, cur) => {
      const op = cur.operator as WhereFilterOp;
      return acc.where(cur.prop, op, cur.val);
    }, this.firestoreColRef);
    if (orderByObj) {
      query = query.orderBy(orderByObj.fieldPath, orderByObj.directionStr);
    }
    if (limitVal) {
      query = query.limit(limitVal);
    }
    return query.get().then(this.extractTFromColSnap);
  }

  whereEqualTo(prop: keyof T, val: IFirestoreVal): QueryBuilder<T> {
    return new QueryBuilder<T>(this).whereEqualTo(prop, val);
  }

  whereGreaterThan(prop: keyof T, val: IFirestoreVal): QueryBuilder<T> {
    return new QueryBuilder<T>(this).whereGreaterThan(prop, val);
  }

  whereGreaterOrEqualThan(prop: keyof T, val: IFirestoreVal): QueryBuilder<T> {
    return new QueryBuilder<T>(this).whereGreaterOrEqualThan(prop, val);
  }

  whereLessThan(prop: keyof T, val: IFirestoreVal): QueryBuilder<T> {
    return new QueryBuilder<T>(this).whereLessThan(prop, val);
  }

  whereLessOrEqualThan(prop: keyof T, val: IFirestoreVal): QueryBuilder<T> {
    return new QueryBuilder<T>(this).whereLessOrEqualThan(prop, val);
  }

  whereArrayContains(prop: keyof T, val: IFirestoreVal): QueryBuilder<T> {
    return new QueryBuilder<T>(this).whereArrayContains(prop, val);
  }
}
