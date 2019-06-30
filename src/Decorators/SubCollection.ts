import { getMetadataStorage } from '../MetadataStorage';
import { plural } from 'pluralize';

export default function SubCollection(
  entity: Function,
  name?: string
): Function {
  return function(target: Function, propertyKey: string) {
    getMetadataStorage().setSubCollection({
      entity,
      name: name || plural(propertyKey),
      parentEntity: target.constructor,
    });
  };
}
