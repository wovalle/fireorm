import { InstanstiableIEntity } from './types';
import { Firestore } from '@google-cloud/firestore';
let store: IMetadataStore = null;

export interface IMetadataStore {
  metadataStorage: MetadataStorage;
}

const globalStore = global as any;

export interface CollectionMetadata {
  entity: Function;
  name: string;
}

export interface SubCollectionMetadata {
  parentEntity: Function;
  name: string;
  entity: Function;
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

  public getRepository = (param: string | InstanstiableIEntity) => {
    return this.repositories.get(param);
  };

  public setRepository = (repo: RepositoryMetadata) => {
    this.repositories.set(repo.entity, repo);
  };

  public firestoreRef: Firestore = null;
}

export const getMetadataStorage = (): MetadataStorage => {
  if (!store) {
    throw new Error(
      'Application has not been initialized. Call Initialize() method'
    );
  }

  return store.metadataStorage;
};

export const Initialize = (
  firestore: Firestore,
  metadataStore: IMetadataStore = globalStore
): void => {
  store = metadataStore;

  if (!store.metadataStorage) {
    store.metadataStorage = new MetadataStorage();
  }

  store.metadataStorage.firestoreRef = firestore;
};
