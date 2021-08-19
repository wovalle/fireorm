import { IEntity, IFirestoreBatchSingleRepository } from '../types';
import { BaseFirestoreBatchRepository } from './BaseFirestoreBatchRepository';

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
  implements IFirestoreBatchSingleRepository<T>
{
  async commit() {
    await this.batch.commit();
  }
}
