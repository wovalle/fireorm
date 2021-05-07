import { Timestamp, GeoPoint, DocumentReference } from '@google-cloud/firestore';
import { IEntity } from './types';

export function isTimestamp(x: unknown): x is Timestamp {
  return typeof x === 'object' && x !== null && 'toDate' in x;
}

export function isGeoPoint(x: unknown): x is GeoPoint {
  return typeof x === 'object' && x !== null && x.constructor.name === 'GeoPoint';
}

export function isDocumentReference(x: unknown): x is DocumentReference {
  return typeof x === 'object' && x !== null && x.constructor.name === 'DocumentReference';
}

export function isObject(x: unknown): x is Record<string, unknown> {
  return typeof x === 'object';
}

export function isString(x: unknown): x is string {
  return typeof x === 'string';
}

export function isEntity(x: unknown): x is IEntity {
  // must be a class and contain id property
  return (
    typeof x === 'object' &&
    x !== null &&
    x.constructor.name !== 'Object' &&
    Object.keys(x).some(x => x === 'id')
  );
}
