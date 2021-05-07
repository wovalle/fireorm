import { getMetadataStorage } from '../MetadataUtils';
import type { IEntity, IEntityConstructor } from '../types';

export function Reference(target: IEntityConstructor) {
  return function (parentEntity: IEntity, propertyKey: string) {
    getMetadataStorage().setReference({
      origin: parentEntity.constructor as IEntityConstructor,
      target,
      propertyKey,
    });
  };
}
