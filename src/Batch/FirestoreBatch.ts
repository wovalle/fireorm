import { IEntity, EntityConstructorOrPath, IFirestoreBatch } from '../types';
import { BaseFirestoreBatchRepository } from './BaseFirestoreBatchRepository';
import { FirestoreBatchSingleRepository } from './FirestoreBatchSingleRepository';
import { Firestore } from '@google-cloud/firestore';
import { FirestoreBatchUnit } from './FirestoreBatchUnit';

// TODO: handle status where batch was already committed.
export class FirestoreBatch implements IFirestoreBatch {
  private batch: FirestoreBatchUnit;

  constructor(protected firestoreRef: Firestore) {
    this.batch = new FirestoreBatchUnit(firestoreRef);
  }

  /**
   *
   * Returns a batch repository of T.
   *
   * @template T
   * @param {EntityConstructorOrPath<T>} entity path or constructor
   * @returns
   * @memberof FirestoreBatch
   */
  getRepository<T extends IEntity>(pathOrConstructor: EntityConstructorOrPath<T>) {
    return new BaseFirestoreBatchRepository(pathOrConstructor, this.batch);
  }

  /**
   *
   * Returns a batch repository of a single entity. Required to maintain
   * current features and will be deleted in the next major version.
   *
   * @template T
   * @param {EntityConstructorOrPath<T>} entity path or constructor
   * @returns
   * @memberof FirestoreBatch
   */
  getSingleRepository<T extends IEntity>(pathOrConstructor: EntityConstructorOrPath<T>) {
    return new FirestoreBatchSingleRepository(pathOrConstructor, this.batch);
  }

  /**
   *
   * Commits current batch.
   *
   * @template T
   * @param {Constructor<T>} entity
   * @returns
   * @memberof FirestoreBatch
   */
  commit = () => {
    return this.batch.commit();
  };
}
