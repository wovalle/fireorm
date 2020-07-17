import { Firestore } from '@google-cloud/firestore';
import { BaseRepository } from './BaseRepository';
import { IEntityConstructor, IEntityRepositoryConstructor } from './types';

export interface IMetadataStore {
  metadataStorage: MetadataStorage;
}

export function getStore(): IMetadataStore {
  return global as never;
}

export interface CollectionMetadata {
  name: string;
  entity: IEntityConstructor;
  parentEntity?: IEntityConstructor;
  propertyKey?: string;
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
  readonly subCollections: Array<CollectionMetadata> = [];
  readonly repositories: Map<unknown, RepositoryMetadata> = new Map();

  public config: MetadataStorageConfig = {
    validateModels: false,
  };

  public getCollection = (param: string | IEntityConstructor) => {
    if (typeof param === 'string') {
      return this.collections.find(c => c.name === param);
    }
    return this.collections.find(c => c.entity === param);
  };

  public setCollection = (col: CollectionMetadata) => {
    const existing = this.getCollection(col.entity);
    if (!existing) {
      this.collections.push(col);
    }
  };

  public getSubCollectionsFromParent = (parentEntity: IEntityConstructor) => {
    return this.subCollections.filter(s => s.parentEntity === parentEntity);
  };

  public getSubCollection = (param: string | IEntityConstructor): CollectionMetadata => {
    if (typeof param === 'string') {
      return this.subCollections.find(c => c.name === param);
    }
    return this.subCollections.find(c => c.entity === param);
  };

  public setSubCollection = (subCol: CollectionMetadata) => {
    this.subCollections.push(subCol);
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

function initializeMetadataStorage(): void {
  const store = getStore();

  if (!store.metadataStorage) {
    store.metadataStorage = new MetadataStorage();
  }
}

/**
 * Used for testing to reset metadataStore to clean state
 */
export function clearMetadataStorage(): void {
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
