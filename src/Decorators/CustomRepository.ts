import { getMetadataStorage } from '../MetadataStorage';

export default function CustomRepository(entity: Function): Function {
  return function(target: Function) {
    getMetadataStorage().repositories.push({
      entity,
      target,
    });
  };
}
