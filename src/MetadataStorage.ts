import { Firestore } from '@google-cloud/firestore';
import { BaseRepository } from './BaseRepository';
import { type } from 'os';
let store: IMetadataStore = null;

export const StoreScopes = {
  global: 'global' as const,
  local: 'local' as const,
};
export type MetadataStoreScope = keyof typeof StoreScopes;

export interface IMetadataStore {
  metadataStorage: MetadataStorage;
  scope: MetadataStoreScope;
}

function getGlobalStore(): IMetadataStore {
  (global as any).scope = 'global';
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

export const getMetadataStorage = (): MetadataStorage => {
  if (!store) {
    initializeMetadataStorage();
  }

  return store.metadataStorage;
};

export function initializeMetadataStorage(localMetadataStore?: IMetadataStore) {
  if (storeIntializedOnGlobal() && localMetadataStore) {
    throw new Error(
      'The store scope has already been initialized on the gloabl scope'
    );
  }

  store = localMetadataStore || getGlobalStore();

  if (!store.metadataStorage) {
    store.metadataStorage = new MetadataStorage();
  }
}

export const Initialize = (
  firestore: Firestore,
  localMetadataStore?: IMetadataStore
): void => {
  initializeMetadataStorage(localMetadataStore);

  store.metadataStorage.firestoreRef = firestore;
};

function storeIntializedOnGlobal() {
  return store && store.scope === StoreScopes.global;
}
