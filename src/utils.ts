import { CollectionMetadata } from './MetadataStorage';
import { IEntity } from '.';
import { AUGMENTED_FIELDS } from './constants';

function filterOutInternalFields<T extends IEntity>(obj: T): Record<string, any> {
  return Object.keys(obj)
    .filter(k => !AUGMENTED_FIELDS.includes(k))
    .map(k => Object.assign({}, { [k]: obj[k] }))
    .reduce((res, o) => Object.assign(res, o), {});
}

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
): Record<string, any> {
  const serializableObj = filterOutInternalFields(obj);
  subColMetadata.forEach(scm => {
    delete serializableObj[scm.propertyKey];
  });
  return serializableObj;
}
