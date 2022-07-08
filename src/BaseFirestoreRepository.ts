import 'reflect-metadata';

import {
  deleteDoc,
  doc,
  DocumentData,
  DocumentSnapshot,
  getDoc,
  Query,
  setDoc,
  updateDoc,
  WhereFilterOp,
} from '@firebase/firestore';

import {
  IRepository,
  IFireOrmQueryLine,
  IOrderByParams,
  IEntity,
  PartialBy,
  ITransactionRepository,
  ICustomQuery,
} from './types';

import { getMetadataStorage } from './MetadataUtils';
import { AbstractFirestoreRepository } from './AbstractFirestoreRepository';
import { FirestoreBatch } from './Batch/FirestoreBatch';

export class BaseFirestoreRepository<T extends IEntity>
  extends AbstractFirestoreRepository<T>
  implements IRepository<T>
{
  async findById(id: string) {
    return getDoc(doc(this.firestoreColRef, id)).then((d: DocumentSnapshot<DocumentData>) =>
      d.exists() ? this.extractTFromDocSnap(d) : null
    );
  }

  async create(item: PartialBy<T, 'id'>): Promise<T> {
    if (this.config.validateModels) {
      const errors = await this.validate(item as T);

      if (errors.length) {
        throw errors;
      }
    }

    if (item.id) {
      const found = await this.findById(item.id);
      if (found) {
        throw new Error(`A document with id ${item.id} already exists.`);
      }
    }

    const newDoc = item.id ? doc(this.firestoreColRef, item.id) : doc(this.firestoreColRef);

    if (!item.id) {
      item.id = newDoc.id;
    }

    await setDoc(newDoc, this.toSerializableObject(item as T));

    this.initializeSubCollections(item as T);

    return item as T;
  }

  async update(item: T) {
    if (this.config.validateModels) {
      const errors = await this.validate(item);

      if (errors.length) {
        throw errors;
      }
    }

    // TODO: handle errors
    await updateDoc(doc(this.firestoreColRef, item.id), this.toSerializableObject(item));
    return item;
  }

  async delete(id: string): Promise<void> {
    // TODO: handle errors
    await deleteDoc(doc(this.firestoreColRef, id));
  }

  async runTransaction<R>(executor: (tran: ITransactionRepository<T>) => Promise<R>) {
    // Importing here to prevent circular dependency
    const { runTransaction } = await import('./helpers');

    return runTransaction<R>(tran => {
      const repository = tran.getRepository<T>(this.path);
      return executor(repository);
    });
  }

  createBatch() {
    const { firestoreRef } = getMetadataStorage();
    return new FirestoreBatch(firestoreRef).getSingleRepository(this.path);
  }

  async execute(
    queries: Array<IFireOrmQueryLine>,
    limitVal?: number,
    orderByObj?: IOrderByParams,
    single?: boolean,
    customQuery?: ICustomQuery<T>
  ): Promise<T[]> {
    let query = queries.reduce<Query>((acc, cur) => {
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

    if (customQuery) {
      query = await customQuery(query, this.firestoreColRef);
    }

    return query.get().then(this.extractTFromColSnap);
  }
}
