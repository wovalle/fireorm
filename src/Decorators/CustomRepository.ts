import { getMetadataStorage } from '../MetadataStorage';
import { IEntity } from '../types';

export default function CustomRepository(entity: {
  new (): IEntity;
}): Function {
  return function(target: Function) {
    getMetadataStorage().setRepository({ entity, target });
  };
}
