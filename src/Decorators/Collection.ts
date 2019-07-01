import { getMetadataStorage } from '../MetadataStorage';
import { plural } from 'pluralize';

export default function Collection(entityName?: string): Function {
  return function(entity: Function) {
    getMetadataStorage().setCollection({
      name: entityName || plural(entity.name),
      entity,
    });
  };
}
