import { getMetadataStorage } from '../MetadataStorage';
import { plural } from 'pluralize';

export default function Collection(name?: string): Function {
  return function(entity: Function) {
    name = name || plural(entity.name);
    getMetadataStorage().setCollection({ name, entity });
  };
}
