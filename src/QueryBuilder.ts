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
  protected countVal: boolean;
  protected offsetVal: number;
  protected startAtVal: any;
  protected startAfterVal: any;
  protected endAtVal: any;
  protected orderByObj: IOrderByParams;

  constructor(protected executor: IQueryExecutor<T>) {}

  private extractWhereParam = (param: IWherePropParam<T>) => {
    if (typeof param === 'string') return param;
    return getPath(param as Function).join('.');
  };

  whereEqualTo(param: IWherePropParam<T>, val: IFirestoreVal): QueryBuilder<T> {
    this.queries.push({
      prop: this.extractWhereParam(param),
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

  offset(offsetVal: number): QueryBuilder<T> {
    if (this.offsetVal) {
      throw new Error('A offset function cannot be called more than once in the same query expression');
    }
    this.offsetVal = offsetVal;
    return this;
  }

  startAt(startAt: any): QueryBuilder<T>{
    if (this.startAtVal) {
      throw new Error('A startAt function cannot be called more than once in the same query expression');
    }
    this.startAtVal = startAt;
    return this;
  }

  startAfter(startAfter: any): QueryBuilder<T>{
    if (this.startAfterVal) {
      throw new Error('A startAfter function cannot be called more than once in the same query expression');
    }
    this.startAfterVal = startAfter;
    return this;
  }

  endAt(endAt: any): QueryBuilder<T>{
    if (this.endAtVal) {
      throw new Error('A endAt function cannot be called more than once in the same query expression');
    }
    this.endAtVal = endAt;
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
  count(): Promise<number>{
    return this.executor.execute(this.queries, this.limitVal, true, this.offsetVal, this.startAtVal, this.startAfterVal, this.endAtVal, this.orderByObj).then(count => count.pop()) as Promise<any>;
  }

  find(): Promise<T[]> {
    return this.executor.execute(this.queries, this.limitVal,  this.countVal,  this.offsetVal, this.startAtVal, this.startAfterVal, this.endAtVal, this.orderByObj);
  }

  findOne(): Promise<T> {
    return this.executor.execute(this.queries, this.limitVal, this.countVal, this.offsetVal, this.startAtVal, this.startAfterVal, this.endAtVal, this.orderByObj).then(res => res.pop());
  }
}
