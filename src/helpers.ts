import { Firestore } from '@google-cloud/firestore';
import { getMetadataStorage } from './MetadataStorage';
import BaseFirestoreRepository from './BaseFirestoreRepository';
import { IEntity } from './types';

export function getRepository(
  entity: IEntity,
  db: Firestore,
  docId?: string,
  subColName?: string
) {
  return _getRepository(entity, 'default', db, docId, subColName);
}

export function getCustomRepository(
  entity: IEntity,
  db: Firestore,
  docId?: string,
  subColName?: string
) {
  return _getRepository(entity, 'custom', db, docId, subColName);
}

export function getBaseRepository(
  entity: IEntity,
  db: Firestore,
  docId?: string,
  subColName?: string
) {
  return _getRepository(entity, 'base', db, docId, subColName);
}

type RepositoryType = 'default' | 'base' | 'custom';

function _getRepository<T extends IEntity>(
  entity: IEntity,
  repositoryType: RepositoryType,
  db: Firestore,
  docId?: string,
  subColName?: string
): BaseFirestoreRepository<T> {
  const repository = getMetadataStorage().repositories.get(entity);

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
