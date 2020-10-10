import { Firestore } from '@google-cloud/firestore';
import { MetadataStorage, MetadataStorageConfig } from './MetadataStorage';

export interface IMetadataStore {
  metadataStorage: MetadataStorage;
}

export function getStore(): IMetadataStore {
  return global as never;
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
