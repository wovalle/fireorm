import { ignoreKey, serializeKey } from './Decorators';
import { SubCollectionMetadata } from './MetadataStorage';
import { IEntity } from '.';

/**
 * Extract getters and object in form of data properties
 * @param {T} Entity object
 * @returns {Object} with only data properties
 */
export function extractAllGetters(obj: Record<string, unknown>) {
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

  return getters.reduce<Record<string, unknown>>((accumulator, currentValue) => {
    if (typeof currentValue === 'string' && obj[currentValue]) {
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
 * @param {SubCollectionMetadata[]} subColMetadata Subcollection
 * metadata to remove runtime-created fields
 * @returns {Object} Serialiable object
 */
export function serializeEntity<T extends IEntity>(
  obj: Partial<T>,
  subColMetadata: SubCollectionMetadata[]
): Record<string, unknown> {
  const objectGetters = extractAllGetters(obj as Record<string, unknown>);

  const serializableObj = { ...obj, ...objectGetters };

  subColMetadata.forEach(scm => {
    delete serializableObj[scm.propertyKey];
  });

  Object.entries(serializableObj).forEach(([propertyKey, propertyValue]) => {
    if (Reflect.getMetadata(ignoreKey, obj, propertyKey) === true) {
      delete serializableObj[propertyKey];
    }
    if (Reflect.getMetadata(serializeKey, obj, propertyKey) !== undefined) {
      if (Array.isArray(propertyValue)) {
        (serializableObj as { [key: string]: unknown })[propertyKey] = propertyValue.map(element =>
          serializeEntity(element, [])
        );
      } else {
        (serializableObj as { [key: string]: unknown })[propertyKey] = serializeEntity(
          propertyValue as Partial<T>,
          []
        );
      }
    }
  });

  return serializableObj;
}

/**
 * Returns true if arrays are equal
 *
 * @export
 * @param {Array<unknown>} arr1
 * @param {Array<unknown>} arr2
 * @returns {boolean}
 */
export function arraysAreEqual(arr1: unknown[], arr2: unknown[]): boolean {
  if (arr1.length !== arr2.length) {
    return false;
  }

  return arr1.every((a, i) => a === arr2[i]);
}
