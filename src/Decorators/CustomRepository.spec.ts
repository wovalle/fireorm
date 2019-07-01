import CustomRepository from './CustomRepository';
import { expect } from 'chai';
import { MetadataStorage, Initialize } from '../MetadataStorage';

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
    class EntityRepo {}

    const repository = store.metadataStorage.repositories.get(Entity);
    expect(store.metadataStorage.repositories.size).to.eql(1);
    expect(repository.entity).to.eql(Entity);
    expect(repository.target).to.eql(EntityRepo);
  });

  it('should enforce that custom repository inherits from BaseRepository');
  it('should only register a repository once');
});
