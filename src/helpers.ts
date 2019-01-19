import { Firestore } from '@google-cloud/firestore';
import { getMetadataStorage } from './MetadataStorage';
import BaseFirestoreRepository from './BaseFirestoreRepository';

export function getRepository<T extends { id: string }>(
  entity: { new (): T },
  db: Firestore
) {
  // first check if there is a custom repository registered
  const customRep = getMetadataStorage().repositories.find(
    c => c.entity === entity
  );

  const collection = getMetadataStorage().collections.find(
    c => c.target === entity
  );

  if (!collection) {
    throw new Error(`'${entity.name}' is not a valid collection.`);
  }

  if (customRep) {
    return new (customRep.target as any)(db, collection.name);
  }

  return getBaseRepository(entity, db);
}

export function getBaseRepository<T extends { id: string }>(
  entity: { new (): T },
  db: Firestore
) {
  const collection = getMetadataStorage().collections.find(
    c => c.target === entity
  );

  if (!collection) {
    throw new Error(`'${entity.name}' is not a valid collection.`);
  }

  return new BaseFirestoreRepository<T>(db, collection.name);
}
