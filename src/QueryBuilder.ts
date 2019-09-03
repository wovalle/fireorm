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
  protected orderByObj: IOrderByParams;

  // TODO: validate not doing range fields in different
  // fields if the indexes are not created
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

  orderByAscending(prop: IWherePropParam<T> & string): QueryBuilder<T> {
    if (this.orderByObj) {
      throw new Error(
        'An orderBy function cannot be called more than once in the same query expression'
      );
    }
    this.orderByObj = {
      fieldPath: prop,
      directionStr: 'asc',
    };
    return this;
  }

  orderByDescending(prop: IWherePropParam<T> & string): QueryBuilder<T> {
    if (this.orderByObj) {
      throw new Error(
        'An orderBy function cannot be called more than once in the same query expression'
      );
    }
    this.orderByObj = {
      fieldPath: prop,
      directionStr: 'desc',
    };
    return this;
  }

  find(): Promise<T[]> {
    return this.executor.execute(this.queries, this.limitVal, this.orderByObj);
  }
}
