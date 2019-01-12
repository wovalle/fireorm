import { getMetadataStorage } from '../MetadataStorage';
import { plural } from 'pluralize';

export default function Collection(name?: string): Function {
  return function(target: any, propertyKey: string) {
    getMetadataStorage().collections.push({
      name: name || plural(propertyKey),
      target,
    });
  };
}
