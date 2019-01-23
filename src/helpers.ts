import { Firestore } from '@google-cloud/firestore';
import { getMetadataStorage } from './MetadataStorage';
import BaseFirestoreRepository from './BaseFirestoreRepository';

export function getRepository<T extends { id: string }>(
  entity: { new (): T },
  db: Firestore,
  docId?: string,
  subColName?: string
) {
  // first check if there is a custom repository registered
  const rep = getMetadataStorage().repositories.find(c => c.entity === entity);

  let collectionName = null;

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

  if (rep) {
    return new (rep.target as any)(db, collectionName, docId, subColName);
  }

  return getBaseRepository(entity, db, docId, subColName);
}

export function getBaseRepository<T extends { id: string }>(
  entity: { new (): T },
  db: Firestore,
  docId?: string,
  subColName?: string
) {
  const collection = getMetadataStorage().collections.find(
    c => c.entity === entity
  );

  if (!collection) {
    throw new Error(`'${entity.name}' is not a valid collection.`);
  }

  return new BaseFirestoreRepository<T>(db, collection.name, docId, subColName);
}
