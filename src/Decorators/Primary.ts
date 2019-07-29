import { getMetadataStorage } from '../MetadataStorage';

export default function(entity: Object, propertyKey: string) {
  getMetadataStorage().setField({
    type: 'primary',
    entity: entity.constructor,
    propertyKey,
  });
}
