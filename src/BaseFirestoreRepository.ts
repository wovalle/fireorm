import 'reflect-metadata';

import { Query, WhereFilterOp } from '@google-cloud/firestore';

import {
  IRepository,
  IFireOrmQueryLine,
  IOrderByParams,
  IEntity,
  PartialBy,
  ITransactionRepository,
} from './types';

import { getMetadataStorage } from './MetadataUtils';
import { AbstractFirestoreRepository } from './AbstractFirestoreRepository';
import { FirestoreBatch } from './Batch/FirestoreBatch';
import { isEntity } from './TypeGuards';

export class BaseFirestoreRepository<T extends IEntity> extends AbstractFirestoreRepository<T>
  implements IRepository<T> {
  async findById(id: string) {
    return this.firestoreColRef
      .doc(id)
      .get()
      .then(d => (d.exists ? this.extractTFromDocSnap(d) : null));
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

    const doc = item.id ? this.firestoreColRef.doc(item.id) : this.firestoreColRef.doc();

    // Check references and see if they need to be created first
    // TODO: inside transaction

    type TCreatedReferences = {
      propertyKey: string;
      path: string;
    };

    const refs: TCreatedReferences[] = [];

    for (const { propertyKey, target } of this.colMetadata.references) {
      const { getRepository } = await import('./helpers');
      const ref = (item as Record<string, unknown>)[propertyKey];

      if (isEntity(ref) && !ref.__fireorm_internal_saved) {
        const repository = getRepository(target);

        const savedReference = await repository.create(ref);

        const path = repository.getPath(savedReference);

        if (!path) {
          throw new Error(`Couldn't get reference path`);
        }

        refs.push({ propertyKey, path });
      }
    }

    await doc.set(this.toSerializableObject(item as T));

    if (!item.id) {
      item.id = doc.id;
    }

    this.initializeSubCollections(item as T);
    this.initPath(item as T);

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
    await this.firestoreColRef.doc(item.id).update(this.toSerializableObject(item));
    return item;
  }

  async delete(id: string): Promise<void> {
    // TODO: handle errors
    await this.firestoreColRef.doc(id).delete();
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
    single?: boolean
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

    return query.get().then(this.extractTFromColSnap);
  }
}
