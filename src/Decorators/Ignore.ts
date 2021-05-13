import 'reflect-metadata';
export const ignoreKey = Symbol('Ignore');

export function Ignore() {
  return Reflect.metadata(ignoreKey, true);
}
