import { CollectionMetadata } from './MetadataStorage';
import { IEntity } from '.';

/**
 * Extract getters and object in form of data properties
 * @param {T} Entity object
 * @returns {Object} with only data properties
 */
export function extractAllGetter<T>(obj: T): Record<string, unknown> {
  const prototype = Object.getPrototypeOf(obj);
  const fromInstanceObj = Object.keys(obj);
  const fromInstance = Object.getOwnPropertyNames(obj);
  const fromPrototype = Object.getOwnPropertyNames(Object.getPrototypeOf(obj));

  const keys = [...fromInstanceObj, ...fromInstance, ...fromPrototype];

  const getters = keys
    .map(key => Object.getOwnPropertyDescriptor(prototype, key))
    .map((descriptor, index) => {
      if (descriptor && typeof descriptor.get === 'function') {
        return keys[index];
      } else {
        return undefined;
      }
    })
    .filter(d => d !== undefined);

  return getters.reduce((accumulator, currentValue) => {
    if (obj[currentValue]) {
      accumulator[currentValue] = obj[currentValue];
    }
    return accumulator;
  }, {});
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
): Record<string, unknown> {
  const objectGetters = extractAllGetter(obj as Record<string, unknown>);

  const serializableObj = { ...obj, ...objectGetters };

  subColMetadata.forEach(scm => {
    delete serializableObj[scm.propertyKey];
  });
  return serializableObj;
}
