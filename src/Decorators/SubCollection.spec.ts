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
    @Collection()
    class Entity {
      id: string;

      @SubCollection(SubEntity, 'subs')
      subentity: ISubCollection<SubEntity>;
    }

    const subCollection = store.metadataStorage.getCollection(SubEntity);

    expect(subCollection.name).toEqual('subs');
    expect(subCollection.parentEntityConstructor).toEqual(Entity);
    expect(subCollection.entityConstructor).toEqual(SubEntity);
    expect(subCollection.propertyKey).toEqual('subentity');
  });

  it('should register collections with default name', () => {
    class SubEntity {
      public id: string;
    }

    @Collection()
    class Entity {
      id: string;

      @SubCollection(SubEntity)
      subentity: ISubCollection<SubEntity>;
    }

    const collection = store.metadataStorage.getCollection(Entity);
    const subCollection = collection.subCollections[0];

    expect(collection.subCollections.length).toEqual(1);
    expect(subCollection.name).toEqual('SubEntities');
    expect(subCollection.parentEntityConstructor).toEqual(Entity);
    expect(subCollection.entityConstructor).toEqual(SubEntity);
    expect(subCollection.propertyKey).toEqual('subentity');
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

    const collection = store.metadataStorage.getCollection(Entity);
    const subCollection = collection.subCollections[0];

    expect(collection.subCollections.length).toEqual(1);
    expect(collection.name).toEqual('col');
    expect(subCollection.name).toEqual('sub');

    expect(subCollection.parentEntityConstructor).toEqual(Entity);
    expect(subCollection.entityConstructor).toEqual(SubEntity);
    expect(subCollection.path).toEqual('col/col$$id/sub');
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

    const collection = store.metadataStorage.getCollection(Entity);
    const subCollection = store.metadataStorage.getCollection(SubEntity);
    const subSubCollection = store.metadataStorage.getCollection(SubSubEntity);

    expect(collection.subCollections.length).toEqual(1);
    expect(subCollection.subCollections.length).toEqual(1);
    expect(subSubCollection.subCollections.length).toEqual(0);
    expect(collection.name).toEqual('col');
    expect(subCollection.name).toEqual('sub');
    expect(subSubCollection.name).toEqual('subsub');

    expect(subCollection.parentEntityConstructor).toEqual(Entity);
    expect(subCollection.entityConstructor).toEqual(SubEntity);
    expect(subCollection.path).toEqual('col/col$$id/sub');

    expect(subSubCollection.parentEntityConstructor).toEqual(SubEntity);
    expect(subSubCollection.entityConstructor).toEqual(SubSubEntity);
    expect(subSubCollection.path).toEqual('col/col$$id/sub/sub$$id/subsub');
  });
});
