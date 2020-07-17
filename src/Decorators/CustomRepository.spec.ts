import { CustomRepository } from './CustomRepository';
import { initialize, getStore, clearMetadataStorage } from '../MetadataStorage';
import { BaseFirestoreRepository } from '../BaseFirestoreRepository';

describe('CustomRepositoryDecorator', () => {
  const store = getStore();

  beforeEach(() => {
    clearMetadataStorage();
    initialize(null);
  });

  it('should register custom repositories', () => {
    class Entity {
      id: string;
    }

    @CustomRepository(Entity)
    class EntityRepo extends BaseFirestoreRepository<Entity> {}

    const repository = store.metadataStorage.repositories.get(Entity);
    expect(store.metadataStorage.repositories.size).toEqual(1);
    expect(repository.entity).toEqual(Entity);
    expect(repository.target).toEqual(EntityRepo);
  });

  it('should only register a repository once', () => {
    class Entity {
      id: string;
    }

    expect(async () => {
      @CustomRepository(Entity)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      class EntityRepo extends BaseFirestoreRepository<Entity> {}

      @CustomRepository(Entity)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      class EntityRepo2 extends BaseFirestoreRepository<Entity> {}
    }).toThrow();
  });

  it('should only register a repository once', () => {
    class Entity {
      id: string;
    }

    @CustomRepository(Entity)
    @CustomRepository(Entity)
    class EntityRepo extends BaseFirestoreRepository<Entity> {}

    const repository = store.metadataStorage.repositories.get(Entity);
    expect(store.metadataStorage.repositories.size).toEqual(1);
    expect(repository.entity).toEqual(Entity);
    expect(repository.target).toEqual(EntityRepo);
  });

  it('should enforce that custom repository inherits from BaseRepository', () => {
    class Entity {
      id: string;
    }

    expect(() => {
      @CustomRepository(Entity)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      class EntityRepo {}
    }).toThrow();
  });
});
