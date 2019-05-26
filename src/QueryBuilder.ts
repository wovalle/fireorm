import {
  IQueryBuilder,
  IFireOrmQueryLine,
  IFireOrmOrderBy,
  IFirestoreVal,
  FirestoreOperators,
  IQueryExecutor,
  IEntity,
} from './types';

import { OrderByDirection, FieldPath } from '@google-cloud/firestore';

export default class QueryBuilder<T extends IEntity>
  implements IQueryBuilder<T> {
  protected queries: Array<IFireOrmQueryLine> = [];
  protected limitVal: number;
  protected orderByObj: IFireOrmOrderBy;

  // TODO: validate not doing range fields in different
  // fields if the indexes are not created
  constructor(protected executor: IQueryExecutor<T>) {}

  whereEqualTo(prop: keyof T, val: IFirestoreVal): QueryBuilder<T> {
    this.queries.push({
      prop: prop.toString(),
      val,
      operator: FirestoreOperators.equal,
    });
    return this;
  }

  whereGreaterThan(prop: keyof T, val: IFirestoreVal): QueryBuilder<T> {
    this.queries.push({
      prop: prop.toString(),
      val,
      operator: FirestoreOperators.greaterThan,
    });
    return this;
  }

  whereGreaterOrEqualThan(prop: keyof T, val: IFirestoreVal): QueryBuilder<T> {
    this.queries.push({
      prop: prop.toString(),
      val,
      operator: FirestoreOperators.greaterThanEqual,
    });
    return this;
  }

  whereLessThan(prop: keyof T, val: IFirestoreVal): QueryBuilder<T> {
    this.queries.push({
      prop: prop.toString(),
      val,
      operator: FirestoreOperators.lessThan,
    });
    return this;
  }

  whereLessOrEqualThan(prop: keyof T, val: IFirestoreVal): QueryBuilder<T> {
    this.queries.push({
      prop: prop.toString(),
      val,
      operator: FirestoreOperators.lessThanEqual,
    });
    return this;
  }

  whereArrayContains(prop: keyof T, val: IFirestoreVal): QueryBuilder<T> {
    this.queries.push({
      prop: prop.toString(),
      val,
      operator: FirestoreOperators.arrayContains,
    });
    return this;
  }

  limit(limitVal: number): QueryBuilder<T> {
    this.limitVal = limitVal;
    return this;
  }

  orderByAscending(prop: keyof T & string): QueryBuilder<T> {
    this.orderByObj = {
      fieldPath: prop,
      directionStr: 'asc',
    };
    return this;
  }

  orderByDescending(prop: keyof T & string): QueryBuilder<T> {
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
