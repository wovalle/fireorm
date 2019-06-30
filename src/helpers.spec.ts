import { expect } from 'chai';

import CustomRepository from './Decorators/CustomRepository';
import Collection from './Decorators/Collection';

import BaseFirestoreRepository from './BaseFirestoreRepository';
import { GetRepository, GetBaseRepository } from './helpers';
import { Initialize, MetadataStorage } from './MetadataStorage';

describe.skip('Helpers', () => {
  let store = { metadataStorage: new MetadataStorage() };

  before(() => {
    Initialize(null, store);
  });

  beforeEach(() => {
    store.metadataStorage = new MetadataStorage();
  });

  it('GetRepository: should get custom repositories', () => {
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

    //TODO: I don't know why store is undefined here, check it out
    const rep = GetRepository(Entity) as EntityRepo;
    expect(rep).to.be.instanceOf(BaseFirestoreRepository);
    expect(rep.meaningOfLife()).to.eql(42);
  });

  it('should get base repositories if custom are not registered', () => {
    @Collection()
    class Entity {
      id: string;
    }

    const rep = GetRepository(Entity);
    expect(rep).to.be.instanceOf(BaseFirestoreRepository);
  });

  it('should throw if trying to get an unexistent collection', () => {
    class Entity {
      id: string;
    }

    expect(() => GetRepository(Entity)).to.throw(
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

    const rep = GetBaseRepository(Entity);
    expect(rep).to.be.instanceOf(BaseFirestoreRepository);
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
