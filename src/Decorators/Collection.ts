import { getMetadataStorage } from '../MetadataStorage';
import { plural } from 'pluralize';
import { InstanstiableIEntity } from '../types';

export function Collection(entityName?: string) {
  return function (entity: InstanstiableIEntity) {
    getMetadataStorage().setCollection({
      name: entityName || plural(entity.name),
      entity,
    });
  };
}
