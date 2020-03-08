import { expect } from 'chai';
const MockFirebase = require('mock-cloud-firestore');
import { Firestore } from '@google-cloud/firestore';

import { initialize } from '..';
import { Collection } from '../Decorators';
import { FirestoreBatch } from './FirestoreBatch';

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
      expect(bandRepository.constructor.name).to.be.eql(
        'BaseFirestoreBatchRepository'
      );
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
      expect(bandRepository.constructor.name).to.be.eql(
        'FirestoreBatchSingleRepository'
      );
    });
  });

  describe('commit', () => {
    it('should throw error if no ops');
    it('should return call inner commit');
  });
});
