import {
  IQueryBuilder,
  IFireOrmQueryLine,
  IFirestoreVal,
  FirestoreOperators,
  IQueryBuilderResult,
} from './types';

import {
  WhereFilterOp,
  QuerySnapshot,
  CollectionReference,
} from '@google-cloud/firestore';

export default class QueryBuilder<T extends { id: string }>
  implements IQueryBuilder<T> {
  // TODO: validate not doing range fields in different
  // fields if the indexes are not created
  constructor(protected firestoreCollection: CollectionReference) {}

  protected queries: Array<IFireOrmQueryLine> = [];

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

  whereArrayCointain(prop: keyof T, val: IFirestoreVal): QueryBuilder<T> {
    this.queries.push({
      prop: prop.toString(),
      val,
      operator: FirestoreOperators.arrayContains,
    });
    return this;
  }

  getQuery(): IQueryBuilderResult {
    return this.queries;
  }

  // TODO: this isn't the place for this
  private extractTFromColSnap(q: QuerySnapshot): T[] {
    return q.docs
      .map(d => d.data() as T)
      .map(t => {
        // HACK: id sanity check
        t.id = `${t.id}`;
        return t;
      });
  }

  find(): Promise<T[]> {
    return this.queries
      .reduce((acc, cur) => {
        const op = cur.operator as WhereFilterOp;
        return acc.where(cur.prop, op, cur.val);
      }, this.firestoreCollection)
      .get()
      .then(this.extractTFromColSnap);
  }
}
