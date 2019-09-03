import QueryBuilder from './QueryBuilder';
import { OrderByDirection } from '@google-cloud/firestore';

// TODO: separate Read/Write interfaces to achieve readonly?
export interface IRepository<T extends { id: string }> {
  limit(limitVal: number): QueryBuilder<T>;
  orderByAscending(prop: keyof T & string): QueryBuilder<T>;
  orderByDescending(prop: keyof T & string): QueryBuilder<T>;
  findById(id: string): Promise<T>;
  create(item: T): Promise<T>;
  update(item: T): Promise<T>;
  delete(id: string): Promise<void>;
}

export type IFirestoreVal = string | number | Date | Boolean;

export enum FirestoreOperators {
  equal = '==',
  lessThan = '<',
  greaterThan = '>',
  lessThanEqual = '<=',
  greaterThanEqual = '>=',
  arrayContains = 'array-contains',
}

export enum FirestoreCollectionType {
  collection,
  subcollection,
}
export interface IFireOrmQueryLine {
  prop: string;
  val: IFirestoreVal;
  operator: FirestoreOperators;
}

export interface IOrderByParams {
  fieldPath: string;
  directionStr: OrderByDirection;
}

export type IQueryBuilderResult = IFireOrmQueryLine[];
export type IWherePropParam<T> = keyof T | ((t: T) => unknown);
export interface IQueryBuilder<T extends IEntity> {
  whereEqualTo(prop: IWherePropParam<T>, val: IFirestoreVal): IQueryBuilder<T>;
  whereGreaterThan(
    prop: IWherePropParam<T>,
    val: IFirestoreVal
  ): IQueryBuilder<T>;
  whereGreaterOrEqualThan(
    prop: IWherePropParam<T>,
    val: IFirestoreVal
  ): IQueryBuilder<T>;
  whereLessThan(prop: IWherePropParam<T>, val: IFirestoreVal): IQueryBuilder<T>;
  whereLessOrEqualThan(
    prop: IWherePropParam<T>,
    val: IFirestoreVal
  ): IQueryBuilder<T>;
  whereArrayContains(
    prop: IWherePropParam<T>,
    val: IFirestoreVal
  ): IQueryBuilder<T>;
  orderByAscending(prop: IWherePropParam<T> & string): IQueryBuilder<T>;
  orderByDescending(prop: IWherePropParam<T> & string): IQueryBuilder<T>;
  find(): Promise<T[]>;
}

export interface IQueryExecutor<T> {
  execute(
    queries: IFireOrmQueryLine[],
    limitVal?: number,
    orderByObj?: IOrderByParams
  ): Promise<T[]>;
}

export type ISubCollection<T extends IEntity> = IRepository<T> &
  IQueryBuilder<T>;

export interface IEntity {
  id: string;
}

export type InstanstiableIEntity = { new (): IEntity };
