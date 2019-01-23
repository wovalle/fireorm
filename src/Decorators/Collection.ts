import { getMetadataStorage } from '../MetadataStorage';
import { plural } from 'pluralize';

export default function Collection(name?: string): Function {
  return function(entity: Function) {
    getMetadataStorage().collections.push({
      name: name || plural(entity.name),
      entity,
    });
  };
}
