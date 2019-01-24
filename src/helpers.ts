import { Firestore } from '@google-cloud/firestore';
import { getMetadataStorage } from './MetadataStorage';
import BaseFirestoreRepository from './BaseFirestoreRepository';

export function getRepository<T extends { id: string }>(
  entity: { new (): T },
  db: Firestore,
  docId?: string,
  subColName?: string
) {
  return _getRepository(entity, 'default', db, docId, subColName);
}

export function getCustomRepository<T extends { id: string }>(
  entity: { new (): T },
  db: Firestore,
  docId?: string,
  subColName?: string
) {
  return _getRepository(entity, 'custom', db, docId, subColName);
}

export function getBaseRepository<T extends { id: string }>(
  entity: { new (): T },
  db: Firestore,
  docId?: string,
  subColName?: string
) {
  return _getRepository(entity, 'base', db, docId, subColName);
}

type RepositoryType = 'default' | 'base' | 'custom';

function _getRepository<T extends { id: string }>(
  entity: { new (): T },
  repositoryType: RepositoryType,
  db: Firestore,
  docId?: string,
  subColName?: string
) {
  const repository = getMetadataStorage().repositories.find(
    c => c.entity === entity
  );

  if (repositoryType === 'custom' && !repository) {
    throw new Error(`'${entity.name}' does not have a custom repository.`);
  }

  let collectionName = null;

  // If docId exists, this is a subcollection. Get parent collection name
  if (docId) {
    const subCollection = getMetadataStorage().subCollections.find(
      c => c.entity === entity
    );

    if (!subCollection) {
      throw new Error(`'${entity.name}' is not a valid subcollection.`);
    }

    const parentCollection = getMetadataStorage().collections.find(
      c => c.entity === subCollection.parentEntity
    );

    if (!parentCollection) {
      throw new Error(
        `'${entity.name}' does not have a valid parent collection.`
      );
    }
    collectionName = parentCollection.name;
  } else {
    const collection = getMetadataStorage().collections.find(
      c => c.entity === entity
    );

    if (!collection) {
      throw new Error(`'${entity.name}' is not a valid collection`);
    }

    collectionName = collection.name;
  }

  if (
    repositoryType === 'custom' ||
    (repositoryType === 'default' && repository)
  ) {
    return new (repository.target as any)(
      db,
      collectionName,
      docId,
      subColName
    );
  } else {
    return new BaseFirestoreRepository<T>(
      db,
      collectionName,
      docId,
      subColName
    );
  }
}
