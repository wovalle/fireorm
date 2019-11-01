import { getMetadataStorage } from '../MetadataStorage';
import { plural } from 'pluralize';
import { InstanstiableIEntity } from '../types';

export function SubCollection(entity: InstanstiableIEntity, entityName?: string): Function {
  return function(target: InstanstiableIEntity, propertyKey: string) {
    getMetadataStorage().setSubCollection({
      entity,
      name: entityName || plural(propertyKey),
      parentEntity: target.constructor,
      propertyKey,
    });
  };
}
