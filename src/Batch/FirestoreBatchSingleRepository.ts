import { IEntity } from '../types';
import { BaseFirestoreBatchRepository } from './BaseFirestoreBatchRepository';
import { ISingleBatchRepository } from '..';

/**
 *
 * This class is only needed to maintain current batch functionality
 * inside repositories and might be deleted in the next major version
 *
 * @export
 * @class FirestoreBatchRepository
 * @extends {FirestoreBatchSingleRepository<T>}
 * @template T
 */
export class FirestoreBatchSingleRepository<T extends IEntity>
  extends BaseFirestoreBatchRepository<T>
  implements ISingleBatchRepository<T> {
  commit() {
    return this.batch.commit();
  }
}
