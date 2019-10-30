import { Firestore } from '@google-cloud/firestore';
import { BaseRepository } from './BaseRepository';

export interface IMetadataStore {
  metadataStorage: MetadataStorage;
}

export function getStore(): IMetadataStore {
  return global as any;
}

export interface CollectionMetadata {
  entity: Function;
  name: string;
}

export interface SubCollectionMetadata {
  parentEntity: Function;
  name: string;
  entity: Function;
  propertyKey: string;
}

export interface RepositoryMetadata {
  target: Function;
  entity: Function;
}

export class MetadataStorage {
  readonly collections: Array<CollectionMetadata> = [];
  readonly subCollections: Array<SubCollectionMetadata> = [];
  readonly repositories: Map<unknown, RepositoryMetadata> = new Map();

  public getCollection = (param: string | Function) => {
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

  public getSubCollectionsFromParent = (parentEntity: Function) => {
    return this.subCollections.filter(s => s.parentEntity === parentEntity);
  };

  public getSubCollection = (
    param: string | Function
  ): SubCollectionMetadata => {
    if (typeof param === 'string') {
      return this.subCollections.find(c => c.name === param);
    }
    return this.subCollections.find(c => c.entity === param);
  };

  public setSubCollection = (subCol: SubCollectionMetadata) => {
    this.subCollections.push(subCol);
  };

  public getRepository = (param: Function) => {
    return this.repositories.get(param);
  };

  public setRepository = (repo: RepositoryMetadata) => {
    const savedRepo = this.getRepository(repo.entity);

    if (savedRepo && repo.target !== savedRepo.target) {
      throw new Error(
        'Cannot register a custom repository twice with two different targets'
      );
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

export const initialize = (firestore: Firestore): void => {
  initializeMetadataStorage();
  getStore().metadataStorage.firestoreRef = firestore;
};

/**
 * @deprecated Use initialize. This will be removed in a future version.
 */
export const Initialize = initialize;