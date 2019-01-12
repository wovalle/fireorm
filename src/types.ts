// TODO: separate Read/Write interfaces to achieve readonly?
export interface IRepository<T extends { id: string }> {
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

export type IQueryBuilderResult = IFireOrmQueryLine[];

export interface IQueryBuilder<T extends { id: string }> {
  whereEqualTo(prop: keyof T, val: IFirestoreVal): IQueryBuilder<T>;
  whereGreaterThan(prop: keyof T, val: IFirestoreVal): IQueryBuilder<T>;
  whereGreaterOrEqualThan(prop: keyof T, val: IFirestoreVal): IQueryBuilder<T>;
  whereLessThan(prop: keyof T, val: IFirestoreVal): IQueryBuilder<T>;
  whereLessOrEqualThan(prop: keyof T, val: IFirestoreVal): IQueryBuilder<T>;
  whereArrayCointain(prop: keyof T, val: IFirestoreVal): IQueryBuilder<T>;
  find(): Promise<T[]>;
}

export type ISubCollection<T extends { id: string }> = IRepository<T> &
  IQueryBuilder<T>;

export interface IEntity {
  id: string;
}
