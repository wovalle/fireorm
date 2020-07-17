import { getMetadataStorage } from '../MetadataStorage';
import { InstanstiableIEntity, Instantiable, IRepository, IEntity } from '../types';

export function CustomRepository<T extends InstanstiableIEntity>(entity: InstanstiableIEntity) {
  return function (target: Instantiable<IRepository<IEntity>>) {
    // TODO: don't know why can't enforce the type to target
    getMetadataStorage().setRepository({
      entity,
      target: target as Instantiable<IRepository<InstanceType<T>>>,
    });
  };
}
