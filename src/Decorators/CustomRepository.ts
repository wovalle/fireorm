import { getMetadataStorage } from '../MetadataStorage';
import { IEntityConstructor, Constructor, IRepository, IEntity } from '../types';

export function CustomRepository(entity: IEntityConstructor) {
  // TODO: don't know why can't enforce the type to target
  return function (target: unknown) {
    getMetadataStorage().setRepository({
      entity,
      target: target as Constructor<IRepository<IEntity>>,
    });
  };
}
