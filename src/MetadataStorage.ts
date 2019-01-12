// tslint:disable-next-line:no-import-side-effect
import 'reflect-metadata';

export const storage = {
  getGlobal: (): any => global,
};

export interface CollectionMetadata {
  target: Function;
  name: string;
}

export interface SubCollectionMetadata {
  target: Function;
  name: string;
  entity: Function;
}

// TODO: create repository metadata storage
export class MetadataStorage {
  readonly collections: CollectionMetadata[] = [];
  readonly subCollections: SubCollectionMetadata[] = [];
}

export const getMetadataStorage = (): MetadataStorage => {
  const global = storage.getGlobal();

  if (!global.metadataStorage) global.metadataStorage = new MetadataStorage();

  return global.metadataStorage;
};
