import { getMetadataStorage } from '../MetadataStorage';
import { plural } from 'pluralize';

export default function SubCollection(
  entity: Function,
  name?: string
): Function {
  return function(target: any, propertyKey: string) {
    getMetadataStorage().subCollections.push({
      entity,
      name: name || plural(propertyKey),
      target: target.constructor,
    });
  };
}
