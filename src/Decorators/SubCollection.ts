import { getMetadataStorage } from '../MetadataStorage';
import { plural } from 'pluralize';
import { IEntityConstructor, IEntity } from '../types';

export function SubCollection(entityConstructor: IEntityConstructor, entityName?: string) {
  return function (parentEntity: IEntity, propertyKey: string) {
    getMetadataStorage().setSubCollection({
      entityConstructor,
      name: entityName || plural(entityConstructor.name),
      parentEntityConstructor: parentEntity.constructor as IEntityConstructor,
      propertyKey,
      path: null,
    });
  };
}
