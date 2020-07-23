import { getMetadataStorage } from '../MetadataStorage';
import { plural } from 'pluralize';
import type { IEntityConstructor } from '../types';

export function Collection(entityName?: string) {
  return function (entityConstructor: IEntityConstructor) {
    const name = entityName || plural(entityConstructor.name);
    getMetadataStorage().setCollection({
      name,
      path: name,
      entityConstructor,
    });
  };
}
