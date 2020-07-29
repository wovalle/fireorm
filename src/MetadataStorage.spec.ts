import { MetadataStorage, CollectionMetadata, RepositoryMetadata } from './MetadataStorage';
import { BaseFirestoreRepository } from './BaseFirestoreRepository';
import { IRepository, Constructor } from './types';

describe('MetadataStorage', () => {
  let metadataStorage: MetadataStorage = undefined;
  class Entity {
    id: string;
  }

  class SubEntity {
    id: string;
  }

  class EntityRepository extends BaseFirestoreRepository<Entity> {}

  const col: CollectionMetadata = {
    entityConstructor: Entity,
    name: 'entity',
  };

  const subCol: CollectionMetadata = {
    entityConstructor: SubEntity,
    name: 'subEntity',
    parentEntityConstructor: Entity,
    propertyKey: 'subEntities',
  };

  const entityRepository: RepositoryMetadata = {
    entity: Entity,
    target: (EntityRepository as unknown) as Constructor<IRepository<Entity>>,
  };

  beforeEach(() => {
    metadataStorage = new MetadataStorage();

    metadataStorage.setCollection(subCol);
    metadataStorage.setCollection(col);
    metadataStorage.setRepository(entityRepository);
  });

  it('must getCollection by string', () => {
    const entityMetadata = metadataStorage.getCollection('entity');

    expect(entityMetadata.entityConstructor).toEqual(col.entityConstructor);
    expect(entityMetadata.name).toEqual(col.name);
    expect(entityMetadata.segments).toEqual(['entity']);
    expect(entityMetadata.subCollections.length).toEqual(1);
  });

  it('must getCollection by constructor', () => {
    const entityMetadata = metadataStorage.getCollection(Entity);

    expect(entityMetadata.entityConstructor).toEqual(col.entityConstructor);
    expect(entityMetadata.name).toEqual(col.name);
    expect(entityMetadata.segments).toEqual(['entity']);
    expect(entityMetadata.subCollections.length).toEqual(1);
  });

  it('must initialize subcollection metadata', () => {
    const entityMetadata = metadataStorage.getCollection('entity');

    expect(entityMetadata.subCollections.length).toEqual(1);
    expect(entityMetadata.subCollections[0]).toEqual(subCol);
    expect(entityMetadata.subCollections[0].segments).toEqual(['entity', 'subEntity']);
  });

  it('must not store repeated collections', () => {
    metadataStorage.setCollection(col);
    expect(metadataStorage.collections.filter(c => c.entityConstructor === Entity).length).toEqual(
      1
    );
  });
  it('must getRepositories', () => {
    const repo = metadataStorage.getRepository(Entity);

    expect(repo.entity).toEqual(entityRepository.entity);
    expect(repo.target).toEqual(entityRepository.target);
  });
});
