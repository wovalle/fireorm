import { expect } from 'chai';
import * as sinon from 'sinon';
const MockFirebase = require('mock-cloud-firestore');

import CustomRepository from './Decorators/CustomRepository';
import Collection from './Decorators/Collection';

import BaseFirestoreRepository from './BaseFirestoreRepository';
import { GetRepository, GetBaseRepository } from './helpers';
import { Initialize } from './MetadataStorage';

describe('Helpers', () => {
  let firestore = null;
  let stub = null;
  const metadataStorage = { collections: [], repositories: [] };

  before(() => {
    const firebase = new MockFirebase();
    stub = sinon
      .stub(global as any, 'metadataStorage')
      .returns(metadataStorage);

    firestore = firebase.firestore();
    Initialize(firestore);
  });

  afterEach(() => {
    metadataStorage.repositories = [];
  });

  after(() => stub.restore());

  describe('GetRepository', () => {
    it('should get custom repositories', () => {
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

      const rep = GetRepository(Entity) as EntityRepo;
      expect(rep instanceof BaseFirestoreRepository).to.be.true;
      expect(rep.meaningOfLife()).to.eql(42);
    });
    it('should get base repositories if custom are not registered', () => {
      @Collection()
      class Entity {
        id: string;
      }

      const rep = GetRepository(Entity);
      expect(rep instanceof BaseFirestoreRepository).to.be.true;
    });
    it('should throw if trying to get an unexistent collection', () => {
      class Entity {
        id: string;
      }

      expect(() => GetRepository(Entity)).to.throw(
        "'Entity' is not a valid collection"
      );
    });
  });
  describe('GetBaseRepository', () => {
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

      const rep = GetBaseRepository(Entity);
      expect(rep instanceof BaseFirestoreRepository).to.be.true;
      expect(rep['meaningOfLife']).to.be.undefined;
    });

    it('should throw if trying to get an unexistent collection', () => {
      class Entity {
        id: string;
      }

      expect(() => GetRepository(Entity)).to.throw(
        "'Entity' is not a valid collection"
      );
    });
  });
});
