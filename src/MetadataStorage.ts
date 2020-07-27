import { Firestore } from '@google-cloud/firestore';
import { BaseRepository } from './BaseRepository';
import { IEntityConstructor, IEntityRepositoryConstructor, Constructor, IEntity } from './types';

export interface IMetadataStore {
  metadataStorage: MetadataStorage;
}

export function getStore(): IMetadataStore {
  return global as never;
}

export interface CollectionMetadata {
  name: string;
  entityConstructor: IEntityConstructor;
  parentEntityConstructor?: IEntityConstructor;
  propertyKey?: string;
  path: string | null;
}

export interface FullCollectionMetadata extends CollectionMetadata {
  subCollections: CollectionMetadata[];
}
export interface RepositoryMetadata {
  target: IEntityRepositoryConstructor;
  entity: IEntityConstructor;
}

export interface MetadataStorageConfig {
  validateModels?: boolean;
}

export class MetadataStorage {
  readonly collections: Array<CollectionMetadata> = [];
  readonly repositories: Map<IEntityConstructor, RepositoryMetadata> = new Map();

  public config: MetadataStorageConfig = {
    validateModels: false,
  };

  public getCollection = (
    pathOrConstructor: string | IEntityConstructor
  ): FullCollectionMetadata => {
    const collection =
      typeof pathOrConstructor === 'string'
        ? this.collections.find(c => c.path === pathOrConstructor)
        : this.collections.find(c => c.entityConstructor === pathOrConstructor);

    if (!collection) {
      return null;
    }

    const subCollections = this.collections.filter(
      s => s.parentEntityConstructor === collection.entityConstructor
    );

    return {
      ...collection,
      subCollections,
    };
  };

  public setCollection = (col: CollectionMetadata) => {
    const existing = this.getCollection(col.entityConstructor);
    if (!existing) {
      this.collections.push(col);
    } else {
      const foundCol = this.collections.find(
        e => e.entityConstructor === existing.entityConstructor
      );

      foundCol.entityConstructor = foundCol.entityConstructor || col.entityConstructor;
      foundCol.name = foundCol.name || col.name;
      foundCol.parentEntityConstructor =
        foundCol.parentEntityConstructor || col.parentEntityConstructor;
      foundCol.path = foundCol.path || col.path;
      foundCol.propertyKey = foundCol.propertyKey || col.propertyKey;
    }

    const getWhereImParent = (p: Constructor<IEntity>) =>
      this.collections.filter(c => c.parentEntityConstructor === p);

    const colsToUpdate = getWhereImParent(col.entityConstructor);

    // update path for subcollections and subcollections of subcollections
    while (colsToUpdate.length) {
      const c = colsToUpdate.pop();
      const parent = this.collections.find(p => p.entityConstructor === c.parentEntityConstructor);

      c.path = `${parent.path}/${parent.name}$$id/${c.name}`;
      getWhereImParent(c.entityConstructor).forEach(col => colsToUpdate.push(col));
    }
  };

  public getRepository = (param: IEntityConstructor) => {
    return this.repositories.get(param);
  };

  public setRepository = (repo: RepositoryMetadata) => {
    const savedRepo = this.getRepository(repo.entity);

    if (savedRepo && repo.target !== savedRepo.target) {
      throw new Error('Cannot register a custom repository twice with two different targets');
    }

    if (!(repo.target.prototype instanceof BaseRepository)) {
      throw new Error(
        'Cannot register a custom repository on a class that does not inherit from BaseFirestoreRepository'
      );
    }

    this.repositories.set(repo.entity, repo);
  };

  public firestoreRef: Firestore = null;
}

function initializeMetadataStorage() {
  const store = getStore();

  if (!store.metadataStorage) {
    store.metadataStorage = new MetadataStorage();
  }
}

/**
 * Used for testing to reset metadataStore to clean state
 */
export function clearMetadataStorage() {
  const store = getStore();
  store.metadataStorage = null;
}

/**
 * Return exisiting metadataStorage, otherwise create if not present
 */
export const getMetadataStorage = (): MetadataStorage => {
  const store = getStore();

  if (!store.metadataStorage) {
    initializeMetadataStorage();
  }

  return store.metadataStorage;
};

export const initialize = (
  firestore: Firestore,
  config: MetadataStorageConfig = { validateModels: false }
): void => {
  initializeMetadataStorage();

  const { metadataStorage } = getStore();

  metadataStorage.firestoreRef = firestore;
  metadataStorage.config = config;
};

/**
 * @deprecated Use initialize. This will be removed in a future version.
 */
export const Initialize = initialize;
