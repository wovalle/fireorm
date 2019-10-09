import { getMetadataStorage } from '../MetadataStorage';
import { plural } from 'pluralize';

export function SubCollection(entity: Function, entityName?: string): Function {
  return function(target: Function, propertyKey: string) {
    getMetadataStorage().setSubCollection({
      entity,
      name: entityName || plural(propertyKey),
      parentEntity: target.constructor,
      propertyKey,
    });
  };
}
