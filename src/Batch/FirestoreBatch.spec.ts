import { Firestore } from '@google-cloud/firestore';

import { initialize } from '..';
import { Collection } from '../Decorators';
import { FirestoreBatch } from './FirestoreBatch';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const MockFirebase = require('mock-cloud-firestore');

describe('FirestoreBatch', () => {
  let firestore: Firestore = undefined;

  beforeEach(() => {
    const firebase = new MockFirebase();
    firestore = firebase.firestore();
    initialize(firestore);
  });

  describe('getRepository', () => {
    it('should return a valid BatchRepository<T>', async () => {
      @Collection()
      class Entity {
        id: string;
      }

      const tran = new FirestoreBatch(firestore);

      const bandRepository = tran.getRepository(Entity);
      expect(bandRepository.constructor.name).toEqual('BaseFirestoreBatchRepository');
    });
  });

  describe('getStandaloneRepository', () => {
    it('should return a valid BatchStandaloneRepository<T>', async () => {
      @Collection()
      class Entity {
        id: string;
      }

      const tran = new FirestoreBatch(firestore);

      const bandRepository = tran.getSingleRepository(Entity);
      expect(bandRepository.constructor.name).toEqual('FirestoreBatchSingleRepository');
    });
  });

  describe('commit', () => {
    it('should throw error if no ops', () => {
      const tran = new FirestoreBatch(firestore);

      expect(tran.commit()).rejects.toThrow('Cannot commit a batch with zero operations');
    });

    it.todo('when calling FirestoreBatch.commit it should call FirestoreBatchUnit.commit');
  });
});
