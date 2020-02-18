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

export default class QueryBuilder<T extends IEntity>
  implements IQueryBuilder<T> {
  protected queries: Array<IFireOrmQueryLine> = [];
  protected limitVal: number;
  protected offsetVal: number;
  protected orderByObj: IOrderByParams;

  constructor(protected executor: IQueryExecutor<T>) {}

  private extractWhereParam = (param: IWherePropParam<T>) => {
    if (typeof param === 'string') return param;
    return getPath(param as Function).join('.');
  };

  whereEqualTo(
      prop: IWherePropParam<T>,
      val: IFirestoreVal
  ): QueryBuilder<T> {
    this.queries.push({
      prop: this.extractWhereParam(prop),
      val,
      operator: FirestoreOperators.equal,
    });
    return this;
  }

  whereGreaterThan(
    prop: IWherePropParam<T>,
    val: IFirestoreVal
  ): QueryBuilder<T> {
    this.queries.push({
      prop: this.extractWhereParam(prop),
      val,
      operator: FirestoreOperators.greaterThan,
    });
    return this;
  }

  whereGreaterOrEqualThan(
    prop: IWherePropParam<T>,
    val: IFirestoreVal
  ): QueryBuilder<T> {
    this.queries.push({
      prop: this.extractWhereParam(prop),
      val,
      operator: FirestoreOperators.greaterThanEqual,
    });
    return this;
  }

  whereLessThan(prop: IWherePropParam<T>, val: IFirestoreVal): QueryBuilder<T> {
    this.queries.push({
      prop: this.extractWhereParam(prop),
      val,
      operator: FirestoreOperators.lessThan,
    });
    return this;
  }

  whereLessOrEqualThan(
    prop: IWherePropParam<T>,
    val: IFirestoreVal
  ): QueryBuilder<T> {
    this.queries.push({
      prop: this.extractWhereParam(prop),
      val,
      operator: FirestoreOperators.lessThanEqual,
    });
    return this;
  }

  whereArrayContains(
    prop: IWherePropParam<T>,
    val: IFirestoreVal
  ): QueryBuilder<T> {
    this.queries.push({
      prop: this.extractWhereParam(prop),
      val,
      operator: FirestoreOperators.arrayContains,
    });
    return this;
  }

  limit(limitVal: number): QueryBuilder<T> {
    if (this.limitVal) {
      throw new Error(
        'A limit function cannot be called more than once in the same query expression'
      );
    }
    this.limitVal = limitVal;
    return this;
  }

  offset(
      offsetVal: number
  ): QueryBuilder<T> {
    if (this.offsetVal) {
      throw new Error(
          'A offset function cannot be called more than once in the same query expression'
      );
    }
    this.offsetVal = offsetVal;
    return this;
  }

  orderByAscending(prop: IWherePropParam<T>): QueryBuilder<T> {
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

  orderByDescending(prop: IWherePropParam<T>): QueryBuilder<T> {
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

  find(): Promise<T[]> {
    return this.executor.execute(this.queries, this.limitVal, this.offsetVal, this.orderByObj);
  }

  async findOne(): Promise<T | null> {
    const queryResult = await this.executor.execute(this.queries, this.limitVal, this.offsetVal, this.orderByObj, true);
    
    return queryResult.length ? queryResult[0] : null;
  }
}
