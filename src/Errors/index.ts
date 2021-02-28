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

export class DuplicatedReference extends Error {
  constructor(propertyKey: string, entityName: string) {
    super(
      `Reference in field ${propertyKey} in ${entityName} collection has already been registered`
    );
  }
}
