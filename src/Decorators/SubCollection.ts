import { getMetadataStorage } from '../MetadataStorage';
import { plural } from 'pluralize';
import { IEntityConstructor, IEntity } from '../types';

export function SubCollection(entity: IEntityConstructor, entityName?: string) {
  return function (target: IEntity, propertyKey: string) {
    getMetadataStorage().setSubCollection({
      entity,
      name: entityName || plural(propertyKey),
      parentEntity: target.constructor as IEntityConstructor,
      propertyKey,
    });
  };
}
