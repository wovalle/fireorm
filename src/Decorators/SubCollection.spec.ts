import { SubCollection } from './SubCollection';
import { initialize, clearMetadataStorage, getStore } from '../MetadataStorage';

describe.skip('SubCollectionDecorator', () => {
  const store = getStore();

  beforeEach(() => {
    clearMetadataStorage();
    initialize(null);
  });

  it('should register collections', () => {
    class SubEntity {
      public id: string;
    }
    class Entity {
      @SubCollection(SubEntity, 'subs')
      readonly subentity: null;
    }

    expect(store.metadataStorage.subCollections.length).toEqual(1);
    expect(store.metadataStorage.subCollections[0].name).toEqual('subs');
    expect(store.metadataStorage.subCollections[0].parentEntity).toEqual(
      Entity
    );
    expect(store.metadataStorage.subCollections[0].entity).toEqual(SubEntity);
    expect(store.metadataStorage.subCollections[0].propertyKey).toEqual(
      'subentity'
    );
  });

  it('should register collections with default name', () => {
    class SubEntity {
      public id: string;
    }
    class Entity {
      @SubCollection(SubEntity)
      readonly subentity: null;
    }

    expect(store.metadataStorage.subCollections.length).toEqual(1);
    expect(store.metadataStorage.subCollections[0].name).toEqual('subentities');
    expect(store.metadataStorage.subCollections[0].parentEntity).toEqual(
      Entity
    );
    expect(store.metadataStorage.subCollections[0].entity).toEqual(SubEntity);
    expect(store.metadataStorage.subCollections[0].propertyKey).toEqual(
      'subentity'
    );
  });
});
