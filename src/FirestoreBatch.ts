import { IEntity, Instantiable } from './types';
import { BaseFirestoreBatchRepository } from './BaseFirestoreBatchRepository';
import { FirestoreBatchRepository } from './FirestoreBatchRepository';
import { WriteBatch, Firestore } from '@google-cloud/firestore';

// TODO: handle status where batch was already committed.
export class FirestoreBatch {
  private batch: WriteBatch;

  constructor(protected firestoreRef: Firestore) {
    this.batch = firestoreRef.batch();
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
   * @deprecated
   *
   * Returns a batch repository of a single entity. Required to maintain
   * current features and will be deleted in the next major version.
   *
   * @template T
   * @param {Instantiable<T>} entity
   * @returns
   * @memberof FirestoreBatch
   */
  getStandaloneRepository<T extends IEntity>(entity: Instantiable<T>) {
    return new FirestoreBatchRepository(this.batch, entity);
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
