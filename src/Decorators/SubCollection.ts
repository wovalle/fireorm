import { getMetadataStorage } from '../MetadataStorage';
import { plural } from 'pluralize';
import { InstanstiableIEntity, IEntity } from '../types';

export function SubCollection(entity: InstanstiableIEntity, entityName?: string) {
  return function (target: IEntity, propertyKey: string) {
    getMetadataStorage().setSubCollection({
      entity,
      name: entityName || plural(propertyKey),
      parentEntity: target.constructor as InstanstiableIEntity,
      propertyKey,
    });
  };
}
