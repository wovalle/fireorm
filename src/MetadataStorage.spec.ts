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

  class SubSubEntity {
    public id: string;
  }

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

  const subSubCol: CollectionMetadata = {
    entityConstructor: SubSubEntity,
    name: 'subSubEntity',
    parentEntityConstructor: SubEntity,
    propertyKey: 'subSubEntities',
  };

  beforeEach(() => {
    metadataStorage = new MetadataStorage();
  });

  describe('getCollection', () => {
    beforeEach(() => {
      metadataStorage.setCollection(subSubCol);
      metadataStorage.setCollection(subCol);
      metadataStorage.setCollection(col);
    });

    it('should get Collection by string', () => {
      const entityMetadata = metadataStorage.getCollection('entity');

      expect(entityMetadata.entityConstructor).toEqual(col.entityConstructor);
      expect(entityMetadata.name).toEqual(col.name);
      expect(entityMetadata.segments).toEqual(['entity']);
      expect(entityMetadata.subCollections.length).toEqual(1);
    });

    it('should get Collection by constructor', () => {
      const entityMetadata = metadataStorage.getCollection(Entity);

      expect(entityMetadata.entityConstructor).toEqual(col.entityConstructor);
      expect(entityMetadata.name).toEqual(col.name);
      expect(entityMetadata.segments).toEqual(['entity']);
      expect(entityMetadata.subCollections.length).toEqual(1);
    });

    it('should get SubCollection by string', () => {
      const entityMetadata = metadataStorage.getCollection(
        'entity/entity-id/subEntity/subEntity-id/subSubEntity'
      );

      expect(entityMetadata.entityConstructor).toEqual(subSubCol.entityConstructor);
      expect(entityMetadata.name).toEqual(subSubCol.name);
      expect(entityMetadata.segments).toEqual(['entity', 'subEntity', 'subSubEntity']);
      expect(entityMetadata.subCollections.length).toEqual(0);
    });

    it('should get SubCollection by constructor', () => {
      const entityMetadata = metadataStorage.getCollection(subSubCol.entityConstructor);

      expect(entityMetadata.entityConstructor).toEqual(subSubCol.entityConstructor);
      expect(entityMetadata.name).toEqual(subSubCol.name);
      expect(entityMetadata.segments).toEqual(['entity', 'subEntity', 'subSubEntity']);
      expect(entityMetadata.subCollections.length).toEqual(0);
    });

    it('should return null when using invalid collection path', () => {
      const entityMetadata = metadataStorage.getCollection('this_is_not_a_path');
      expect(entityMetadata).toEqual(null);
    });

    it('should throw error if initialized with an invalid subcollection path', () => {
      const entityMetadata = metadataStorage.getCollection(
        'entity/entity-id/subEntity/subEntity-id/fake-path'
      );
      expect(entityMetadata).toEqual(null);
    });

    it('should return null when using invalid collection constructor', () => {
      class NewEntity {
        id: string;
      }

      const entityMetadata = metadataStorage.getCollection(NewEntity);
      expect(entityMetadata).toEqual(null);
    });

    it('should initialize subcollection metadata', () => {
      const entityMetadata = metadataStorage.getCollection('entity');

      expect(entityMetadata.subCollections.length).toEqual(1);
      expect(entityMetadata.subCollections[0].entityConstructor).toEqual(subCol.entityConstructor);
      expect(entityMetadata.subCollections[0].segments).toEqual(['entity', 'subEntity']);
    });

    it('should throw error if initialized with an incomplete path', () => {
      expect(() =>
        metadataStorage.getCollection('entity/entity-id/subEntity/subEntity-id')
      ).toThrow('Invalid collection path: entity/entity-id/subEntity/subEntity-id');
    });
  });

  describe('setCollection', () => {
    it('should store collections', () => {
      metadataStorage.setCollection(col);
      const collection = metadataStorage.collections.find(
        c => c.entityConstructor === col.entityConstructor
      );

      expect(collection.entityConstructor).toEqual(col.entityConstructor);
      expect(collection.name).toEqual(col.name);
      expect(collection.parentEntityConstructor).toEqual(col.parentEntityConstructor);
      expect(collection.propertyKey).toEqual(col.propertyKey);
      expect(collection.segments).toEqual([col.name]);
    });

    it('should throw when trying to store duplicate collections', () => {
      metadataStorage.setCollection(col);
      expect(() => metadataStorage.setCollection(col)).toThrowError(
        `Collection with name ${col.name} has already been registered`
      );
    });

    it('should update segments for nested subcollections', () => {
      // Due to the order of how the decorators are evaluated,
      // children collections are registered first
      metadataStorage.setCollection(subSubCol);
      metadataStorage.setCollection(subCol);
      metadataStorage.setCollection(col);

      const collection = metadataStorage.collections.find(
        c => c.entityConstructor === subSubCol.entityConstructor
      );

      expect(collection.segments).toEqual([col.name, subCol.name, subSubCol.name]);
    });
  });

  describe('getRepository', () => {
    class EntityRepository extends BaseFirestoreRepository<Entity> {}

    const entityRepository: RepositoryMetadata = {
      entity: Entity,
      target: EntityRepository as unknown as Constructor<IRepository<Entity>>,
    };

    beforeEach(() => {
      metadataStorage.setRepository(entityRepository);
    });

    it('should get repositories', () => {
      const repo = metadataStorage.getRepository(Entity);

      expect(repo.entity).toEqual(entityRepository.entity);
      expect(repo.target).toEqual(entityRepository.target);
    });

    it('should return null for invalid repositories', () => {
      class WrongEntity {
        id: string;
      }

      const repo = metadataStorage.getRepository(WrongEntity);
      expect(repo).toEqual(null);
    });
  });

  describe('setRepository', () => {
    class EntityRepository extends BaseFirestoreRepository<Entity> {}

    const entityRepository: RepositoryMetadata = {
      entity: Entity,
      target: EntityRepository as unknown as Constructor<IRepository<Entity>>,
    };

    it('should store repositories', () => {
      metadataStorage.setRepository(entityRepository);
      expect(metadataStorage.getRepositories().size).toEqual(1);
      expect(metadataStorage.getRepositories().get(entityRepository.entity).entity).toEqual(Entity);
    });

    it('should throw when trying to store two repositories with the same entity class', () => {
      class EntityRepository2 extends BaseFirestoreRepository<Entity> {}

      const entityRepository2: RepositoryMetadata = {
        entity: Entity,
        target: EntityRepository2 as unknown as Constructor<IRepository<Entity>>,
      };

      metadataStorage.setRepository(entityRepository);

      expect(() => metadataStorage.setRepository(entityRepository2)).toThrowError(
        'Cannot register a custom repository twice with two different targets'
      );
    });

    it('should throw when trying to store repositories that dont inherit from BaseRepository', () => {
      class EntityRepository2 {}
      class Entity2 {
        id: string;
      }

      const entityRepository2: RepositoryMetadata = {
        entity: Entity2,
        target: EntityRepository2 as unknown as Constructor<IRepository<Entity>>,
      };

      metadataStorage.setRepository(entityRepository);

      expect(() => metadataStorage.setRepository(entityRepository2)).toThrowError(
        'Cannot register a custom repository on a class that does not inherit from BaseFirestoreRepository'
      );
    });
  });
});
