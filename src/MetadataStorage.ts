import { Firestore } from '@google-cloud/firestore';
import { BaseRepository } from './BaseFirestoreRepository';
import { InstanstiableIEntity, RelationshipType } from './types';
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
  propertyKey: string;
}

export interface RepositoryMetadata {
  target: Function;
  entity: Function;
}

export interface RelationshipMetadata {
  name: string;
  primaryEntity: InstanstiableIEntity;
  primaryKey: string;
  foreignEntity: InstanstiableIEntity;
  foreignKey: string;
  propertyKey: string;
  type: RelationshipType;
  lazy: boolean;
}

export class MetadataStorage {
  readonly collections: Array<CollectionMetadata> = [];
  readonly subCollections: Array<SubCollectionMetadata> = [];
  readonly repositories: Map<unknown, RepositoryMetadata> = new Map();
  readonly relationships: Array<RelationshipMetadata> = [];

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

  public getPrimaryRelationships = (param: InstanstiableIEntity) => {
    return this.relationships.filter(r => r.primaryEntity === param);
  };

  public getRelationships = (param: InstanstiableIEntity) => {
    // WIP: prevent duplicates
    const primary = this.relationships.filter(r => r.primaryEntity === param);
    const foreign = this.relationships.filter(r => r.foreignEntity === param);
    return [...primary, ...foreign];
  };

  public setRelationships = (rel: RelationshipMetadata) => {
    // WIP: define validation
    this.relationships.push(rel);
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
