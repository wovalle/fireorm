import { getMetadataStorage } from './MetadataStorage';
import BaseFirestoreRepository from './BaseFirestoreRepository';
import { IEntity } from './types';

export function GetRepository<T extends IEntity>(
  entity: { new (): T },
  docId?: string,
  subColName?: string
) {
  return _getRepository(entity, 'default', docId, subColName);
}

export function GetCustomRepository<T extends IEntity>(
  entity: { new (): T },
  docId?: string,
  subColName?: string
) {
  return _getRepository(entity, 'custom', docId, subColName);
}

export function GetBaseRepository<T extends IEntity>(
  entity: { new (): T },
  docId?: string,
  subColName?: string
) {
  return _getRepository(entity, 'base', docId, subColName);
}

type RepositoryType = 'default' | 'base' | 'custom';

function _getRepository<T extends IEntity>(
  entity: { new (): T },
  repositoryType: RepositoryType,
  docId?: string,
  subColName?: string
): BaseFirestoreRepository<T> {
  const {
    firestoreRef,
    repositories,
    subCollections,
    collections,
  } = getMetadataStorage();

  if (!firestoreRef) {
    throw new Error('Firestore must be initialized first');
  }

  const repository = repositories.get(entity);

  if (repositoryType === 'custom' && !repository) {
    throw new Error(`'${entity.name}' does not have a custom repository.`);
  }

  let collectionName = null;

  // If docId exists, this is a subcollection. Get parent collection name
  if (docId) {
    const subCollection = subCollections.find(c => c.entity === entity);

    if (!subCollection) {
      throw new Error(`'${entity.name}' is not a valid subcollection.`);
    }

    const parentCollection = collections.find(
      c => c.entity === subCollection.parentEntity
    );

    if (!parentCollection) {
      throw new Error(
        `'${entity.name}' does not have a valid parent collection.`
      );
    }
    collectionName = parentCollection.name;
  } else {
    const collection = collections.find(c => c.entity === entity);

    if (!collection) {
      throw new Error(`'${entity.name}' is not a valid collection`);
    }

    collectionName = collection.name;
  }

  if (
    repositoryType === 'custom' ||
    (repositoryType === 'default' && repository)
  ) {
    return new (repository.target as any)(collectionName, docId, subColName);
  } else {
    return new BaseFirestoreRepository<T>(collectionName, docId, subColName);
  }
}
