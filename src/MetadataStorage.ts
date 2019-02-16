import { IEntity } from './types';

export interface IMetadataStorage {
  get(): any;
}

const globalStorage = {
  get: (): any => global,
};

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
  readonly collections: CollectionMetadata[] = [];
  readonly subCollections: SubCollectionMetadata[] = [];
  readonly repositories: Map<IEntity, RepositoryMetadata> = new Map();
}

export const getMetadataStorage = (
  storage: IMetadataStorage = globalStorage
): MetadataStorage => {
  const global = storage.get();

  if (!global.metadataStorage) global.metadataStorage = new MetadataStorage();

  return global.metadataStorage;
};
