import { IEntity } from './types';
import { BaseFirestoreBatchRepository } from './BaseFirestoreBatchRepository';

/**
 * @deprecated
 *
 * This class is only needed to maintain current batch functionality
 * inside repositories and will be deleted in the next major version
 *
 * @export
 * @class FirestoreBatchRepository
 * @extends {FirestoreBatchSingleRepository<T>}
 * @template T
 */
export class FirestoreBatchSingleRepository<
  T extends IEntity
> extends BaseFirestoreBatchRepository<T> {
  commit() {
    return this.batch.commit();
  }
}
