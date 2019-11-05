import { getMetadataStorage } from './MetadataStorage';
import { BaseFirestoreRepository } from './BaseFirestoreRepository';
import { IEntity } from './types';

export function getRepository<T extends IEntity>(
  entity: { new (): T },
  documentPath?: string,
) {
  return _getRepository(entity, 'default', documentPath);
}

/**
 * @deprecated Use getRepository. This will be removed in a future version.
 */
export const GetRepository = getRepository;

export function getCustomRepository<T extends IEntity>(
  entity: { new (): T },
  documentPath?: string,
) {
  return _getRepository(entity, 'custom', documentPath);
}

/**
 * @deprecated Use getCustomRepository. This will be removed in a future version.
 */
export const GetCustomRepository = getCustomRepository;

export function getBaseRepository<T extends IEntity>(
  entity: { new (): T },
  documentPath?: string,
) {
  return _getRepository(entity, 'base', documentPath);
}

/**
 * @deprecated Use getBaseRepository. This will be removed in a future version.
 */
export const GetBaseRepository = getBaseRepository;

type RepositoryType = 'default' | 'base' | 'custom';

function _getRepository<T extends IEntity>(
  entity: { new (): T },
  repositoryType: RepositoryType,
  documentPath: string,
): BaseFirestoreRepository<T> {
  const metadataStorage = getMetadataStorage();

  if (!metadataStorage.firestoreRef) {
    throw new Error('Firestore must be initialized first');
  }

  const repository = metadataStorage.getRepository(entity);

  if (repositoryType === 'custom' && !repository) {
    throw new Error(`'${entity.name}' does not have a custom repository.`);
  }

  const collection = documentPath
    ? metadataStorage.getSubCollection(entity)
    : metadataStorage.getCollection(entity);

  if (!collection) {
    throw new Error(`'${entity.name}' is not a valid collection`);
  }

  if (collection.parentEntity) {
    const parentCollection = metadataStorage.getCollection(collection.parentEntity);

    if (!parentCollection) {	
      throw new Error(	
        `'${entity.name}' does not have a valid parent collection.`	
      );	
    }
  }

  if (
    repositoryType === 'custom' ||
    (repositoryType === 'default' && repository)
  ) {
    return new (repository.target as any)(collection.name, documentPath);
  } else {
    return new BaseFirestoreRepository<T>(collection.name, documentPath);
  }
}
