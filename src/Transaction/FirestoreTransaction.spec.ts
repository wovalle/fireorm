import { Transaction } from '@google-cloud/firestore';

import { FirestoreTransaction } from './FirestoreTransaction';
import { initialize } from '..';
import { Collection } from '../Decorators';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const MockFirebase = require('mock-cloud-firestore');

describe('FirestoreTransaction', () => {
  beforeEach(() => {
    const firebase = new MockFirebase();
    const firestore = firebase.firestore();
    initialize(firestore);
  });

  describe('getRepository', () => {
    it('should return a valid TransactionRepository<T>', async () => {
      @Collection()
      class Entity {
        id: string;
      }

      const innerTran = {} as Transaction;
      const tran = new FirestoreTransaction(innerTran, new Set());

      const bandRepository = tran.getRepository(Entity);
      expect(bandRepository.constructor.name).toEqual('TransactionRepository');
    });
  });
});
