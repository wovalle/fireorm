import { SubCollection } from './SubCollection';
import { initialize, clearMetadataStorage, getStore } from '../MetadataStorage';
import { ISubCollection } from '../types';
import { Collection } from './Collection';

describe('SubCollectionDecorator', () => {
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
      id: string;

      @SubCollection(SubEntity, 'subs')
      subentity: ISubCollection<SubEntity>;
    }

    expect(store.metadataStorage.subCollections.length).toEqual(1);
    expect(store.metadataStorage.subCollections[0].name).toEqual('subs');
    expect(store.metadataStorage.subCollections[0].parentEntityConstructor).toEqual(Entity);
    expect(store.metadataStorage.subCollections[0].entityConstructor).toEqual(SubEntity);
    expect(store.metadataStorage.subCollections[0].propertyKey).toEqual('subentity');
  });

  it('should register collections with default name', () => {
    class SubEntity {
      public id: string;
    }
    class Entity {
      id: string;

      @SubCollection(SubEntity)
      subentity: ISubCollection<SubEntity>;
    }

    expect(store.metadataStorage.subCollections.length).toEqual(1);
    expect(store.metadataStorage.subCollections[0].name).toEqual('SubEntities');
    expect(store.metadataStorage.subCollections[0].parentEntityConstructor).toEqual(Entity);
    expect(store.metadataStorage.subCollections[0].entityConstructor).toEqual(SubEntity);
    expect(store.metadataStorage.subCollections[0].propertyKey).toEqual('subentity');
  });

  it('should initialize subcollections', () => {
    class SubEntity {
      public id: string;
    }

    @Collection('col')
    class Entity {
      id: string;

      @SubCollection(SubEntity, 'sub')
      subentity: ISubCollection<SubEntity>;
    }

    expect(store.metadataStorage.subCollections.length).toEqual(1);
    expect(store.metadataStorage.subCollections[0].name).toEqual('sub');

    expect(store.metadataStorage.collections.length).toEqual(2);
    expect(store.metadataStorage.collections[0].name).toEqual('sub');
    expect(store.metadataStorage.collections[1].name).toEqual('col');

    expect(store.metadataStorage.subCollections[0].parentEntityConstructor).toEqual(Entity);
    expect(store.metadataStorage.subCollections[0].entityConstructor).toEqual(SubEntity);
    expect(store.metadataStorage.subCollections[0].path).toEqual('col/col$$id/sub');
  });

  it('should correctly initialize subcollections inside subcollections', () => {
    class SubSubEntity {
      public id: string;
    }

    class SubEntity {
      public id: string;

      @SubCollection(SubSubEntity, 'subsub')
      subsubentity: ISubCollection<SubSubEntity>;
    }

    @Collection('col')
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    class Entity {
      id: string;

      @SubCollection(SubEntity, 'sub')
      subentity: ISubCollection<SubEntity>;
    }

    expect(store.metadataStorage.subCollections.length).toEqual(2);
    expect(store.metadataStorage.subCollections[0].name).toEqual('subsub');
    expect(store.metadataStorage.subCollections[1].name).toEqual('sub');

    expect(store.metadataStorage.collections.length).toEqual(3);
    expect(store.metadataStorage.collections[0].name).toEqual('subsub');
    expect(store.metadataStorage.collections[1].name).toEqual('sub');
    expect(store.metadataStorage.collections[2].name).toEqual('col');

    expect(store.metadataStorage.collections[0].parentEntityConstructor).toEqual(SubEntity);
    expect(store.metadataStorage.collections[0].entityConstructor).toEqual(SubSubEntity);
    expect(store.metadataStorage.collections[0].path).toEqual('col/col$$id/sub/sub$$id/subsub');
  });
});
