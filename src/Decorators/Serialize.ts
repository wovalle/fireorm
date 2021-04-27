import 'reflect-metadata';
export const serializeKey = Symbol('Serialize');

export function Serialize() {
  return Reflect.metadata(serializeKey, true);
}
