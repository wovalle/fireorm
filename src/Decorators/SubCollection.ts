import { getMetadataStorage } from '../MetadataStorage';
import { plural } from 'pluralize';

export default function SubCollection(
  entity: Function,
  name?: string
): Function {
  return function(target: Function, propertyKey: string) {
    getMetadataStorage().subCollections.push({
      entity,
      name: name || plural(propertyKey),
      parentEntity: target.constructor,
    });
  };
}
