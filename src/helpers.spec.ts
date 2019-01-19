import { expect } from 'chai';
import MockFirebase from 'mock-cloud-firestore';
import sinon from 'sinon';

import CustomRepository from './Decorators/CustomRepository';
import Collection from './Decorators/Collection';

import BaseFirestoreRepository from './BaseFirestoreRepository';
import { getRepository, getBaseRepository } from './helpers';

describe.only('Helpers', () => {
  let globalRef: any = null;
  let firestore = null;
  const metadataStorage = { collections: [], repositories: [] };

  let stub = null;

  const getStorage: any = () => global;
  before(() => {
    const firebase = new MockFirebase();
    stub = sinon
      .stub(global as any, 'metadataStorage')
      .returns(metadataStorage);

    firestore = firebase.firestore();

    const globalObj = getStorage();
    globalRef = globalObj;
    globalObj.metadataStorage = metadataStorage;
  });

  afterEach(() => {
    metadataStorage.repositories = [];
    stub.restore();
  });

  after(() => {
    global = globalRef;
  });

  describe('getRepository', () => {
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

      const rep = getRepository(Entity, firestore);
      expect(rep instanceof BaseFirestoreRepository).to.be.true;
      expect(rep.meaningOfLife()).to.eql(42);
    });
    it('should get base repositories if custom are not registered', () => {
      @Collection()
      class Entity {
        id: string;
      }

      const rep = getRepository(Entity, firestore);
      expect(rep instanceof BaseFirestoreRepository).to.be.true;
    });
    it('should throw if trying to get an unexistent collection', () => {
      class Entity {
        id: string;
      }

      expect(() => getRepository(Entity, firestore)).to.throw(
        "'Entity' is not a valid collection"
      );
    });
  });
  describe('getBaseRepository', () => {
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

      const rep = getBaseRepository(Entity, firestore);
      expect(rep instanceof BaseFirestoreRepository).to.be.true;
      expect(rep['meaningOfLife']).to.be.undefined;
    });

    it('should throw if trying to get an unexistent collection', () => {
      class Entity {
        id: string;
      }

      expect(() => getRepository(Entity, firestore)).to.throw(
        "'Entity' is not a valid collection"
      );
    });
  });
});
