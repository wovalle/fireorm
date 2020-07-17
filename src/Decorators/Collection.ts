import { getMetadataStorage } from '../MetadataStorage';
import { plural } from 'pluralize';
import { IEntityConstructor } from '../types';

export function Collection(entityName?: string) {
  return function (entity: IEntityConstructor) {
    getMetadataStorage().setCollection({
      name: entityName || plural(entity.name),
      entity,
    });
  };
}
