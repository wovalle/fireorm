import {
  IQueryBuilder,
  IFireOrmQueryLine,
  IOrderByParams,
  IFirestoreVal,
  FirestoreOperators,
  IQueryExecutor,
  IEntity,
} from './types';

export default class QueryBuilder<T extends IEntity>
  implements IQueryBuilder<T> {
  protected queries: Array<IFireOrmQueryLine> = [];
  protected limitVal: number;
  protected orderByObj: IOrderByParams;

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
    if (this.orderByObj) {
      throw new Error('An orderBy function cannot be called more than once in the same query expression')
    }
    this.orderByObj = {
      fieldPath: prop,
      directionStr: 'asc',
    };
    return this;
  }

  orderByDescending(prop: keyof T & string): QueryBuilder<T> {
    if (this.orderByObj) {
      throw new Error('An orderBy function cannot be called more than once in the same query expression')
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
