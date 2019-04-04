import { IEntity } from './types';
import { Firestore } from '@google-cloud/firestore';

export interface IMetadataStorage {
  get(): any;
}

const globalStorage = {
  get: (): any => global,
};

interface Constructable<T> {
  new (): T;
}

export interface CollectionMetadata {
  entity: Constructable<Function>;
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
  readonly collections: CollectionMetadata[] = [];
  readonly subCollections: SubCollectionMetadata[] = [];
  readonly repositories: Map<
    { new (): IEntity },
    RepositoryMetadata
  > = new Map();
  public firestoreRef: Firestore = null;
}

export const getMetadataStorage = (
  storage: IMetadataStorage = globalStorage
): MetadataStorage => {
  const global = storage.get();

  if (!global.metadataStorage) {
    global.metadataStorage = new MetadataStorage();
  }

  return global.metadataStorage;
};

export const Initialize = (
  firestore: Firestore,
  storage: IMetadataStorage = globalStorage
): void => {
  const metadataStorage = getMetadataStorage(storage);
  metadataStorage.firestoreRef = firestore;
};
