import { getMetadataStorage } from '../MetadataUtils';
import { Constructor, IRepository, IEntity } from '../types';
import { BaseRepository } from '../BaseRepository';

/*
  Cannot enforce the type in target presumably becasuse Typescript
  cannot verify than the T from the entity param is the same T from
  the repository. Might be interesting to revisit later
*/
export function CustomRepository<T extends IEntity = IEntity>(entity: Constructor<T>) {
  return function (target: BaseRepository) {
    getMetadataStorage().setRepository({
      entity,
      target: target as Constructor<IRepository<T>>,
    });
  };
}
