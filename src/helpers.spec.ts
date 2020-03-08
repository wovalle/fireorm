import { expect } from 'chai';
const MockFirebase = require('mock-cloud-firestore');

import { Collection, CustomRepository } from './Decorators';
import { BaseFirestoreRepository } from './BaseFirestoreRepository';
import {
  getRepository,
  getBaseRepository,
  runTransaction,
  createBatch,
} from './helpers';
import { initialize } from './MetadataStorage';
import { FirestoreTransaction } from './Transaction/FirestoreTransaction';
import { FirestoreBatch } from './Batch/FirestoreBatch';

describe('Helpers', () => {
  beforeEach(() => {
    const firebase = new MockFirebase();
    const firestore = firebase.firestore();
    initialize(firestore);
  });

  it('getRepository: should get custom repositories', () => {
    @Collection()
    class Entity {
      id: string;
    }

    @CustomRepository(Entity)
    class EntityRepo extends BaseFirestoreRepository<Entity> {
      meaningOfLife() {
        return 42;
      }
    }

    const rep = getRepository(Entity) as EntityRepo;
    expect(rep).to.be.instanceOf(BaseFirestoreRepository);
    expect(rep.meaningOfLife()).to.eql(42);
  });

  it('should get base repositories if custom are not registered', () => {
    @Collection()
    class Entity {
      id: string;
    }

    const rep = getRepository(Entity);
    expect(rep).to.be.instanceOf(BaseFirestoreRepository);
  });

  it('should throw if trying to get an unexistent collection', () => {
    class Entity {
      id: string;
    }

    expect(() => getRepository(Entity)).to.throw(
      "'Entity' is not a valid collection"
    );
  });

  it('should get base repository even if a custom one is registered', () => {
    @Collection()
    class Entity {
      id: string;
    }

    @CustomRepository(Entity)
    class EntityRepo extends BaseFirestoreRepository<Entity> {
      meaningOfLife() {
        return 42;
      }
    }

    const rep = getBaseRepository(Entity);
    expect(rep).to.be.instanceOf(BaseFirestoreRepository);
    expect(rep['meaningOfLife']).to.be.undefined;
  });

  it('should throw if trying to get an unexistent collection', () => {
    class Entity {
      id: string;
    }

    expect(() => getRepository(Entity)).to.throw(
      "'Entity' is not a valid collection"
    );
  });

  it('runTransaction: should be able to get a transaction repository', async () => {
    await runTransaction(async transaction => {
      expect(transaction).to.be.instanceOf(FirestoreTransaction);
    });
  });

  it('createBatch: should be able to get a batch repository', () => {
    expect(createBatch()).to.be.instanceOf(FirestoreBatch);
  });
});
