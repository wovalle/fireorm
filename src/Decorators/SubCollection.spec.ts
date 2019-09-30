import SubCollection from './SubCollection';
import { expect } from 'chai';
import { MetadataStorage, Initialize, StoreScopes } from '../MetadataStorage';

describe('SubCollectionDecorator', () => {
  const store = {
    metadataStorage: new MetadataStorage(),
    scope: StoreScopes.local,
  };

  beforeEach(() => {
    store.metadataStorage = new MetadataStorage();
    Initialize(null, store);
  });

  it('should register collections', () => {
    class SubEntity {}
    class Entity {
      @SubCollection(SubEntity, 'subentities')
      readonly subentity: null;
    }

    expect(store.metadataStorage.subCollections.length).to.eql(1);
    expect(store.metadataStorage.subCollections[0].name).to.eql('subentities');
    expect(store.metadataStorage.subCollections[0].parentEntity).to.eql(Entity);
    expect(store.metadataStorage.subCollections[0].entity).to.eql(SubEntity);
    expect(store.metadataStorage.subCollections[0].propertyKey).to.eql(
      'subentity'
    );
  });

  it('should register collections with default name', () => {
    class SubEntity {}
    class Entity {
      @SubCollection(SubEntity)
      readonly subentity: null;
    }

    expect(store.metadataStorage.subCollections.length).to.eql(1);
    expect(store.metadataStorage.subCollections[0].name).to.eql('subentities');
    expect(store.metadataStorage.subCollections[0].parentEntity).to.eql(Entity);
    expect(store.metadataStorage.subCollections[0].entity).to.eql(SubEntity);
    expect(store.metadataStorage.subCollections[0].propertyKey).to.eql(
      'subentity'
    );
  });
});
