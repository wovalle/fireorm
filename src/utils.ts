import { CollectionMetadata } from './MetadataStorage';
import { IEntity } from '.';

/**
 * Returns a serializable object from entity<T>
 *
 * @template T
 * @param {T} Entity object
 * @param {CollectionMetadata[]} subColMetadata Subcollection
 * metadata to remove runtime-created fields
 * @returns {Object} Serialiable object
 */
export function serializeEntity<T extends IEntity>(
  obj: T,
  subColMetadata: CollectionMetadata[]
): Object {
  const serializableObj = { ...obj };
  subColMetadata.forEach(scm => {
    delete serializableObj[scm.propertyKey];
  });
  return serializableObj;
}
