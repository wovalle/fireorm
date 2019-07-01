import Collection from './Collection';
import { expect } from 'chai';
import { MetadataStorage, Initialize } from '../MetadataStorage';

describe('CollectionDecorator', () => {
  let store = { metadataStorage: new MetadataStorage() };

  before(() => {
    Initialize(null, store);
  });

  beforeEach(() => {
    store.metadataStorage = new MetadataStorage();
  });

  it('should register collections', () => {
    @Collection('foo')
    class Entity {
      id: string;
    }

    const collection = store.metadataStorage.getCollection('foo');
    expect(store.metadataStorage.collections.length).to.eql(1);
    expect(collection.name).to.eql('foo');
    expect(collection.entity).to.eql(Entity);
  });

  it('should register collections with default name', () => {
    @Collection()
    class Entity {
      id: string;
    }

    const collection = store.metadataStorage.getCollection('Entities');
    expect(store.metadataStorage.collections.length).to.eql(1);
    expect(collection.name).to.eql('Entities');
    expect(collection.entity).to.eql(Entity);
  });

  it('should register collections once', () => {
    @Collection()
    @Collection()
    class Entity {
      id: string;
    }

    const collection = store.metadataStorage.getCollection('Entities');
    expect(store.metadataStorage.collections.length).to.eql(1);
    expect(collection.name).to.eql('Entities');
    expect(collection.entity).to.eql(Entity);
  });
});
