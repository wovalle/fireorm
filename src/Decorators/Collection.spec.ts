import { initialize, getStore, clearMetadataStorage } from '../MetadataStorage';
import { Collection } from './Collection';

describe('CollectionDecorator', () => {
  const store = getStore();
  beforeEach(() => {
    clearMetadataStorage();
    initialize(null);
  });

  it('should register collections', () => {
    @Collection('foo')
    class Entity {
      id: string;
    }

    const collection = store.metadataStorage.getCollection('foo');
    expect(store.metadataStorage.collections.length).toEqual(1);
    expect(collection.name).toEqual('foo');
    expect(collection.path).toEqual('foo');
    expect(collection.entityConstructor).toEqual(Entity);
  });

  it('should register collections with default name', () => {
    @Collection()
    class Entity {
      id: string;
    }

    const collection = store.metadataStorage.getCollection('Entities');
    expect(store.metadataStorage.collections.length).toEqual(1);
    expect(collection.name).toEqual('Entities');
    expect(collection.path).toEqual('Entities');
    expect(collection.entityConstructor).toEqual(Entity);
  });

  it('should register collections once', () => {
    @Collection()
    @Collection()
    class Entity {
      id: string;
    }

    const collection = store.metadataStorage.getCollection('Entities');
    expect(store.metadataStorage.collections.length).toEqual(1);
    expect(collection.name).toEqual('Entities');
    expect(collection.entityConstructor).toEqual(Entity);
  });
});
