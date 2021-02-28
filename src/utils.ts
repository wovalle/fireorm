import { FullCollectionMetadata } from './MetadataStorage';
import { IEntity } from '.';
import { Firestore } from '@google-cloud/firestore';

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
 * @param {FullCollectionMetadata} colMetadata Collection metadata
 * metadata to remove runtime-created fields
 * @returns {Object} Serialiable object
 */
export function serializeEntity<T extends IEntity>(
  obj: Partial<T>,
  colMetadata: FullCollectionMetadata,
  firestore?: Firestore // TODO: detach from this
): Record<string, unknown> {
  // Remove All getters
  const objectGetters = extractAllGetters(obj as Record<string, unknown>);

  const serialized = { ...obj, ...objectGetters } as Record<string, unknown>;

  // Remove all subcollections
  colMetadata.subCollections.forEach(scm => {
    delete serialized[scm.propertyKey];
  });

  // Update all T with their respective path
  colMetadata.references.forEach(r => {
    if (typeof serialized[r.propertyKey] === 'object') {
      const path = (serialized[r.propertyKey] as T).__fireorm_internal_path;
      serialized[r.propertyKey] = path ? firestore?.doc(path) : null;
    } else if (typeof serialized[r.propertyKey] === 'string') {
      serialized[r.propertyKey] = firestore?.doc(serialized[r.propertyKey] as string);
    } else {
      // TODO: handle this, apart from undefined, what else has to be handled?
      console.error('weird reference', typeof serialized[r.propertyKey]);
    }
  });

  // Remove all internal fields
  Object.keys(serialized).forEach(k => {
    if (k.includes('__fireorm_internal')) {
      delete serialized[k];
    }
  });

  return serialized;
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
