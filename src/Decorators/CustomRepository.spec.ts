import CustomRepository from './CustomRepository';
import { expect } from 'chai';
import { MetadataStorage, Initialize } from '../MetadataStorage';
import { BaseFirestoreRepository } from '..';

describe('CustomRepositoryDecorator', () => {
  const store = { metadataStorage: new MetadataStorage() };

  beforeEach(() => {
    store.metadataStorage = new MetadataStorage();
    Initialize(null, store);
  });

  it('should register custom repositories', () => {
    class Entity {
      id: string;
    }

    @CustomRepository(Entity)
    class EntityRepo extends BaseFirestoreRepository<Entity> {}

    const repository = store.metadataStorage.repositories.get(Entity);
    expect(store.metadataStorage.repositories.size).to.eql(1);
    expect(repository.entity).to.eql(Entity);
    expect(repository.target).to.eql(EntityRepo);
  });

  it('should only register a repository once', () => {
    class Entity {
      id: string;
    }

    expect(() => {
      @CustomRepository(Entity)
      class EntityRepo extends BaseFirestoreRepository<Entity> {}

      @CustomRepository(Entity)
      class EntityRepo2 extends BaseFirestoreRepository<Entity> {}
    }).to.throw;
  });

  it('should only register a repository once', () => {
    class Entity {
      id: string;
    }

    @CustomRepository(Entity)
    @CustomRepository(Entity)
    class EntityRepo extends BaseFirestoreRepository<Entity> {}

    const repository = store.metadataStorage.repositories.get(Entity);
    expect(store.metadataStorage.repositories.size).to.eql(1);
    expect(repository.entity).to.eql(Entity);
    expect(repository.target).to.eql(EntityRepo);
  });

  it('should enforce that custom repository inherits from BaseRepository', () => {
    class Entity {
      id: string;
    }

    expect(() => {
      @CustomRepository(Entity)
      class EntityRepo {}
    }).to.throw;
  });
});
