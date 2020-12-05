import type { EntityConstructorOrPath, IEntity } from '../types';

export class NoMetadataError extends Error {
  constructor(pathOrConstructor: EntityConstructorOrPath<IEntity>) {
    super(
      `There is no metadata stored for "${
        typeof pathOrConstructor === 'string' ? pathOrConstructor : pathOrConstructor.name
      }"`
    );
  }
}
