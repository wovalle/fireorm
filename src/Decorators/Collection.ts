import { getMetadataStorage } from '../MetadataStorage';
import { plural } from 'pluralize';

export default function Collection(name?: string): Function {
  return function(target: Function) {
    getMetadataStorage().collections.push({
      name: name || plural(target.name),
      target,
    });
  };
}
