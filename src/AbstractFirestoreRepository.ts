import { plainToClass } from 'class-transformer';
import { DocumentSnapshot, QuerySnapshot } from '@google-cloud/firestore';
import {
  FirestoreCollectionType,
  IEntity,
  IQueryBuilder,
  IWherePropParam,
  IFirestoreVal,
  IQueryExecutor,
  IFireOrmQueryLine,
  IOrderByParams,
} from './types';

import {
  getMetadataStorage,
  CollectionMetadata,
  SubCollectionMetadata,
} from './MetadataStorage';

import { BaseRepository } from './BaseRepository';
import QueryBuilder from './QueryBuilder';

export abstract class AbstractFirestoreRepository<T extends IEntity>
  extends BaseRepository
  implements IQueryBuilder<T>, IQueryExecutor<T> {
  protected readonly subColMetadata: SubCollectionMetadata[];
  protected readonly colMetadata: CollectionMetadata;
  protected readonly collectionType: FirestoreCollectionType;
  protected readonly colName: string;
  protected readonly docId: string;
  protected readonly subColName: string;

  constructor(
    nameOrConstructor: string | Function,
    docId?: string,
    subColName?: string
  ) {
    super();

    this.colName =
      typeof nameOrConstructor === 'function'
        ? nameOrConstructor.name
        : nameOrConstructor;

    this.docId = docId;
    this.subColName = subColName;

    const { getCollection, getSubCollectionsFromParent } = getMetadataStorage();
    this.colMetadata = getCollection(nameOrConstructor);

    if (!this.colMetadata) {
      throw new Error(`There is no metadata stored for "${this.colName}"`);
    }

    this.subColMetadata = getSubCollectionsFromParent(this.colMetadata.entity);

    this.collectionType = this.docId
      ? FirestoreCollectionType.subcollection
      : FirestoreCollectionType.collection;
  }

  protected toSerializableObject = (obj: T): Object => {
    this.subColMetadata.forEach(scm => {
      delete obj[scm.propertyKey];
    });
    return { ...obj };
  };

  protected transformFirestoreTypes = (obj: T): T => {
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

  protected initializeSubCollections = (entity: T) => {
    // Requiring here to prevent circular dependency
    const { GetRepository } = require('./helpers');

    this.subColMetadata.forEach(subCol => {
      Object.assign(entity, {
        [subCol.propertyKey]: GetRepository(
          subCol.entity as any,
          entity.id,
          subCol.name
        ),
      });
    });
  };

  protected extractTFromDocSnap = (doc: DocumentSnapshot): T => {
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

  protected extractTFromColSnap = (q: QuerySnapshot): T[] => {
    return q.docs.map(this.extractTFromDocSnap);
  };

  /**
   * Returns a new QueryBuilder with a filter specifying that the
   * value in @param prop must be equal to @param val.
   *
   * @param {IWherePropParam<T>} prop field to be filtered on, where
   * prop could be keyof T or a lambda where T is the first parameter
   * @param {IFirestoreVal} val value to compare in the filter
   * @returns {QueryBuilder<T>} A new QueryBuilder with the specified
   * query applied.
   * @memberof AbstractFirestoreRepository
   */
  whereEqualTo(prop: IWherePropParam<T>, val: IFirestoreVal): IQueryBuilder<T> {
    return new QueryBuilder<T>(this).whereEqualTo(prop, val);
  }

  /**
   * Returns a new QueryBuilder with a filter specifying that the
   * value in @param prop must be greater than @param val.
   *
   * @param {IWherePropParam<T>} prop field to be filtered on, where
   * prop could be keyof T or a lambda where T is the first parameter
   * @param {IFirestoreVal} val value to compare in the filter
   * @returns {QueryBuilder<T>} A new QueryBuilder with the specified
   * query applied.
   * @memberof AbstractFirestoreRepository
   */
  whereGreaterThan(
    prop: IWherePropParam<T>,
    val: IFirestoreVal
  ): IQueryBuilder<T> {
    return new QueryBuilder<T>(this).whereGreaterThan(prop, val);
  }

  /**
   * Returns a new QueryBuilder with a filter specifying that the
   * value in @param prop must be greater or equal than @param val.
   *
   * @param {IWherePropParam<T>} prop field to be filtered on, where
   * prop could be keyof T or a lambda where T is the first parameter
   * @param {IFirestoreVal} val value to compare in the filter
   * @returns {QueryBuilder<T>} A new QueryBuilder with the specified
   * query applied.
   * @memberof AbstractFirestoreRepository
   */
  whereGreaterOrEqualThan(
    prop: IWherePropParam<T>,
    val: IFirestoreVal
  ): IQueryBuilder<T> {
    return new QueryBuilder<T>(this).whereGreaterOrEqualThan(prop, val);
  }

  /**
   * Returns a new QueryBuilder with a filter specifying that the
   * value in @param prop must be less than @param val.
   *
   * @param {IWherePropParam<T>} prop field to be filtered on, where
   * prop could be keyof T or a lambda where T is the first parameter
   * @param {IFirestoreVal} val value to compare in the filter
   * @returns {QueryBuilder<T>} A new QueryBuilder with the specified
   * query applied.
   * @memberof AbstractFirestoreRepository
   */
  whereLessThan(
    prop: IWherePropParam<T>,
    val: IFirestoreVal
  ): IQueryBuilder<T> {
    return new QueryBuilder<T>(this).whereLessThan(prop, val);
  }

  /**
   * Returns a new QueryBuilder with a filter specifying that the
   * value in @param prop must be less or equal than @param val.
   *
   * @param {IWherePropParam<T>} prop field to be filtered on, where
   * prop could be keyof T or a lambda where T is the first parameter
   * @param {IFirestoreVal} val value to compare in the filter
   * @returns {QueryBuilder<T>} A new QueryBuilder with the specified
   * query applied.
   * @memberof AbstractFirestoreRepository
   */
  whereLessOrEqualThan(
    prop: IWherePropParam<T>,
    val: IFirestoreVal
  ): IQueryBuilder<T> {
    return new QueryBuilder<T>(this).whereLessOrEqualThan(prop, val);
  }

  /**
   * Returns a new QueryBuilder with a filter specifying that the
   * value in @param val must be contained in @param prop.
   *
   * @param {IWherePropParam<T>} prop field to be filtered on, where
   * prop could be keyof T or a lambda where T is the first parameter
   * @param {IFirestoreVal} val value to compare in the filter
   * @returns {QueryBuilder<T>} A new QueryBuilder with the specified
   * query applied.
   * @memberof AbstractFirestoreRepository
   */
  whereArrayContains(
    prop: IWherePropParam<T>,
    val: IFirestoreVal
  ): IQueryBuilder<T> {
    return new QueryBuilder<T>(this).whereArrayContains(prop, val);
  }

  /**
   * Returns a new QueryBuilder with a maximum number of results
   * to return. Can only be used once per query.
   *
   * @param {number} limitVal maximum number of results to return
   * Must be greater or equal than 0
   * @returns {IQueryBuilder<T>} QueryBuilder A new QueryBuilder with
   * the specified limit applied
   * @memberof AbstractFirestoreRepository
   */
  limit(limitVal: number): IQueryBuilder<T> {
    if (limitVal < 0) {
      throw new Error(
        `limitVal must be greater than 0. It received: ${limitVal}`
      );
    }

    return new QueryBuilder<T>(this).limit(limitVal);
  }

  /**
   * Returns a new QueryBuilder with an additional ascending order
   * specified by @param prop. Can only be used once per query.
   *
   * @param {IWherePropParam<T>} prop field to be ordered on, where
   * prop could be keyof T or a lambda where T is the first parameter
   * @returns {QueryBuilder<T>} A new QueryBuilder with the specified
   * ordering applied.
   * @memberof AbstractFirestoreRepository
   */
  orderByAscending(prop: IWherePropParam<T>): IQueryBuilder<T> {
    return new QueryBuilder<T>(this).orderByAscending(prop);
  }

  /**
   * Returns a new QueryBuilder with an additional descending order
   * specified by @param prop. Can only be used once per query.
   *
   * @param {IWherePropParam<T>} prop field to be ordered on, where
   * prop could be keyof T or a lambda where T is the first parameter
   * @returns {QueryBuilder<T>} A new QueryBuilder with the specified
   * ordering applied.
   * @memberof AbstractFirestoreRepository
   */
  orderByDescending(prop: IWherePropParam<T>): IQueryBuilder<T> {
    return new QueryBuilder<T>(this).orderByDescending(prop);
  }

  startAt(prop: number): IQueryBuilder<T> {
    return new QueryBuilder<T>(this).startAt(prop);
  }
  startAfter(prop: number): IQueryBuilder<T> {
    return new QueryBuilder<T>(this).startAfter(prop);
  }

  endAt(prop: number): IQueryBuilder<T> {
    return new QueryBuilder<T>(this).endAt(prop);
  }

  /**
   * Execute the query and applies all the filters (if specified)
   *
   * @returns {Promise<T[]>} List of documents that matched the filters
   * (if specified)
   * @memberof AbstractFirestoreRepository
   */
  find(): Promise<T[]> {
    return new QueryBuilder<T>(this).find();
  }

  count(): Promise<number> {
    return new QueryBuilder<T>(this).count();
  }

  findOne(): Promise<T> {
    return new QueryBuilder<T>(this).findOne();
  }

  /**
   * Takes all the queries stored by QueryBuilder and executes them.
   * Must be implemented by base repositores
   *
   * @abstract
   * @param {IFireOrmQueryLine[]} queries list of queries stored in
   * QueryBuilder
   * @param {number} [limitVal] (Optional) if a limit constraint
   * should be applied
   * @param {boolean} [countVal] queries list of queries stored in
   * QueryBuilder
   * @param {number} [offsetVal] queries list of queries stored in
   * QueryBuilder
   * @param {number} [startAtVal] queries list of queries stored in
   * QueryBuilder
   * @param {number} [startAfterVal] queries list of queries stored in
   * QueryBuilder
   * @param {number} [endAtVal] queries list of queries stored in
   * QueryBuilder
   * @param {IOrderByParams} [orderByObj] (Optional) if a sortBy
   * clause should be applied
   * @returns {Promise<T[]>} results from firestore converted into
   * entities <T>
   * @memberof AbstractFirestoreRepository
   */

  abstract execute(
    queries: IFireOrmQueryLine[],
    limitVal?: number,
    countVal?: boolean,
    offsetVal?: number,
    startAtVal?: any,
    startAfterVal?: any,
    endAtVal?: any,
    orderByObj?: IOrderByParams): Promise<T[]>;

}
