import { getPath } from 'ts-object-path';

import {
  IQueryBuilder,
  IFireOrmQueryLine,
  IOrderByParams,
  IFirestoreVal,
  FirestoreOperators,
  IQueryExecutor,
  IEntity,
  IWherePropParam,
} from './types';

export default class QueryBuilder<T extends IEntity> implements IQueryBuilder<T> {
  protected queries: Array<IFireOrmQueryLine> = [];
  protected limitVal: number;
  protected orderByObj: IOrderByParams;

  constructor(protected executor: IQueryExecutor<T>) {}

  private extractWhereParam = (param: IWherePropParam<T>) => {
    if (typeof param === 'string') return param;
    return getPath<T, (t: T) => unknown>(param).join('.');
  };

  whereEqualTo(param: IWherePropParam<T>, val: IFirestoreVal) {
    this.queries.push({
      prop: this.extractWhereParam(param),
      val,
      operator: FirestoreOperators.equal,
    });
    return this;
  }

  whereNotEqualTo(param: IWherePropParam<T>, val: IFirestoreVal) {
    this.queries.push({
      prop: this.extractWhereParam(param),
      val,
      operator: FirestoreOperators.notEqual,
    });
    return this;
  }

  whereGreaterThan(prop: IWherePropParam<T>, val: IFirestoreVal) {
    this.queries.push({
      prop: this.extractWhereParam(prop),
      val,
      operator: FirestoreOperators.greaterThan,
    });
    return this;
  }

  whereGreaterOrEqualThan(prop: IWherePropParam<T>, val: IFirestoreVal) {
    this.queries.push({
      prop: this.extractWhereParam(prop),
      val,
      operator: FirestoreOperators.greaterThanEqual,
    });
    return this;
  }

  whereLessThan(prop: IWherePropParam<T>, val: IFirestoreVal) {
    this.queries.push({
      prop: this.extractWhereParam(prop),
      val,
      operator: FirestoreOperators.lessThan,
    });
    return this;
  }

  whereLessOrEqualThan(prop: IWherePropParam<T>, val: IFirestoreVal) {
    this.queries.push({
      prop: this.extractWhereParam(prop),
      val,
      operator: FirestoreOperators.lessThanEqual,
    });
    return this;
  }

  whereArrayContains(prop: IWherePropParam<T>, val: IFirestoreVal) {
    this.queries.push({
      prop: this.extractWhereParam(prop),
      val,
      operator: FirestoreOperators.arrayContains,
    });
    return this;
  }

  whereArrayContainsAny(prop: IWherePropParam<T>, val: IFirestoreVal[]) {
    if (val.length > 10) {
      throw new Error(`
        This query supports up to 10 values. You provided ${val.length}.
        For details please visit: https://firebase.google.com/docs/firestore/query-data/queries#in_and_array-contains-any
      `);
    }
    this.queries.push({
      prop: this.extractWhereParam(prop),
      val,
      operator: FirestoreOperators.arrayContainsAny,
    });
    return this;
  }

  whereIn(prop: IWherePropParam<T>, val: IFirestoreVal[]) {
    if (val.length > 10) {
      throw new Error(`
        This query supports up to 10 values. You provided ${val.length}.
        For details please visit: https://firebase.google.com/docs/firestore/query-data/queries#in_and_array-contains-any
      `);
    }
    this.queries.push({
      prop: this.extractWhereParam(prop),
      val,
      operator: FirestoreOperators.in,
    });
    return this;
  }

  limit(limitVal: number) {
    if (this.limitVal) {
      throw new Error(
        'A limit function cannot be called more than once in the same query expression'
      );
    }
    this.limitVal = limitVal;
    return this;
  }

  orderByAscending(prop: IWherePropParam<T>) {
    if (this.orderByObj) {
      throw new Error(
        'An orderBy function cannot be called more than once in the same query expression'
      );
    }

    this.orderByObj = {
      fieldPath: this.extractWhereParam(prop),
      directionStr: 'asc',
    };

    return this;
  }

  orderByDescending(prop: IWherePropParam<T>) {
    if (this.orderByObj) {
      throw new Error(
        'An orderBy function cannot be called more than once in the same query expression'
      );
    }

    this.orderByObj = {
      fieldPath: this.extractWhereParam(prop),
      directionStr: 'desc',
    };

    return this;
  }

  find() {
    return this.executor.execute(this.queries, this.limitVal, this.orderByObj);
  }

  async findOne() {
    const queryResult = await this.executor.execute(
      this.queries,
      this.limitVal,
      this.orderByObj,
      true
    );

    return queryResult.length ? queryResult[0] : null;
  }
}
