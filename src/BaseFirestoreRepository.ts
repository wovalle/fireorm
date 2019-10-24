// tslint:disable-next-line:no-import-side-effect
import 'reflect-metadata';

import { CollectionReference, WhereFilterOp } from '@google-cloud/firestore';

import {
  IRepository,
  FirestoreCollectionType,
  IFireOrmQueryLine,
  IOrderByParams,
  IEntity,
} from './types';

import { getMetadataStorage } from './MetadataStorage';
import { AbstractFirestoreRepository } from './AbstractFirestoreRepository';
import { TransactionRepository } from './BaseFirestoreTransactionRepository';
import { FirestoreBatchRepository } from './BatchFirestoreRepository';

export class BaseFirestoreRepository<T extends IEntity>
  extends AbstractFirestoreRepository<T>
  implements IRepository<T> {
  private readonly firestoreColRef: CollectionReference;

  constructor(colName: string);
  constructor(colName: string, docId: string, subColName: string);

  constructor(colName: string, docId?: string, subColName?: string) {
    super(colName, docId, subColName);
    const { firestoreRef } = getMetadataStorage();

    if (!firestoreRef) {
      throw new Error('Firestore must be initialized first');
    }

    if (this.docId) {
      this.firestoreColRef = firestoreRef
        .collection(this.colName)
        .doc(this.docId)
        .collection(this.subColName);
    } else {
      this.firestoreColRef = firestoreRef.collection(this.colName);
    }
  }

  async findById(id: string): Promise<T> {
    return this.firestoreColRef
      .doc(id)
      .get()
      .then(this.extractTFromDocSnap);
  }

  async create(item: T): Promise<T> {
    try {
      if (item.id) {
        const found = await this.findById(item.id);
        if (found) {
          throw `A document with id ${item.id} already exists.`;
        }
      };
       
      const errors = await this.validate(item);

      if (errors.length) {
        throw errors;
      }

      const doc = item.id
        ? this.firestoreColRef.doc(item.id)
        : this.firestoreColRef.doc();

      if (!item.id) {
        item.id = doc.id;
      }
  
      await doc.set(this.toSerializableObject(item));

      if (this.collectionType === FirestoreCollectionType.collection) {
        this.initializeSubCollections(item);
      }

      return item;
    } catch (error) {
      throw new Error(error);
    }
  }

  async update(item: T): Promise<T> {
    try {
      const errors = await this.validate(item);

      if (errors.length) {
        throw errors;
      }
  
      // TODO: handle errors
      await this.firestoreColRef
        .doc(item.id)
        .update(this.toSerializableObject(item));
      return item;
    } catch (error) {
      throw new Error(error);
    }
  }

  async delete(id: string): Promise<void> {
    // TODO: handle errors
    await this.firestoreColRef.doc(id).delete();
  }

  async runTransaction(
    executor: (tran: TransactionRepository<T>) => Promise<void>
  ) {
    return this.firestoreColRef.firestore.runTransaction(async t => {
      return executor(
        new TransactionRepository<T>(
          this.firestoreColRef,
          t,
          this.colMetadata.entity
        )
      );
    });
  }

  createBatch() {
    return new FirestoreBatchRepository(
      this.firestoreColRef,
      this.toSerializableObject
    );
  }

  async execute(
    queries: Array<IFireOrmQueryLine>,
    limitVal?: number,
    orderByObj?: IOrderByParams,
    single?: boolean
  ): Promise<T[]> {
    let query = queries.reduce((acc, cur) => {
      const op = cur.operator as WhereFilterOp;
      return acc.where(cur.prop, op, cur.val);
    }, this.firestoreColRef);

    if (orderByObj) {
      query = query.orderBy(orderByObj.fieldPath, orderByObj.directionStr);
    }

    if (single) {
      query = query.limit(1);
    } else if (limitVal) {
      query = query.limit(limitVal);
    }

    return query.get().then(this.extractTFromColSnap);
  }
}
