import { getMetadataStorage } from '../MetadataStorage';
import { InstanstiableIEntity } from '../types';

export default function CustomRepository(
  entity: InstanstiableIEntity
): Function {
  return function(target: Function) {
    getMetadataStorage().setRepository({ entity, target });
  };
}
