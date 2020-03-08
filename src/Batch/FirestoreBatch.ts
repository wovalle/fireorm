import { IEntity, Instantiable, InstanstiableIEntity } from '../types';
import { BaseFirestoreBatchRepository } from './BaseFirestoreBatchRepository';
import { FirestoreBatchSingleRepository } from './FirestoreBatchSingleRepository';
import { Firestore } from '@google-cloud/firestore';
import { FirestoreBatchUnit } from './FirestoreBatchUnit';

// TODO: handle status where batch was already committed.
export class FirestoreBatch {
  private batch: FirestoreBatchUnit;

  constructor(protected firestoreRef: Firestore) {
    this.batch = new FirestoreBatchUnit(firestoreRef);
  }

  /**
   *
   * Returns a batch repository of T.
   *
   * @template T
   * @param {Instantiable<T>} entity
   * @returns
   * @memberof FirestoreBatch
   */
  getRepository<T extends IEntity>(entity: Instantiable<T>) {
    return new BaseFirestoreBatchRepository(this.batch, entity);
  }

  /**
   *
   * Returns a batch repository of a single entity. Required to maintain
   * current features and will be deleted in the next major version.
   *
   * @template T
   * @param {Instantiable<T>} entity
   * @returns
   * @memberof FirestoreBatch
   */
  getSingleRepository<T extends IEntity>(entity: Instantiable<T>) {
    return new FirestoreBatchSingleRepository(this.batch, entity);
  }

  /**
   *
   * Commits current batch.
   *
   * @template T
   * @param {Instantiable<T>} entity
   * @returns
   * @memberof FirestoreBatch
   */
  commit = () => {
    return this.batch.commit();
  };
}
