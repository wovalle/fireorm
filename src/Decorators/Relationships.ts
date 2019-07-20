import { getMetadataStorage } from '../MetadataStorage';
import { InstanstiableIEntity, RelationshipType } from '..';

export function OneToMany(
  entity: InstanstiableIEntity,
  primaryKey: string,
  foreignKey: string
): Function {
  return function(target: InstanstiableIEntity, propertyKey: string) {
    const primaryEntity = target.constructor as InstanstiableIEntity;
    const foreignEntity = entity;
    const name = [primaryEntity.name, foreignEntity.name]
      .sort((a, b) => a.localeCompare(b))
      .join('_');

    getMetadataStorage().setRelationships({
      primaryEntity,
      primaryKey,
      foreignEntity,
      foreignKey,
      propertyKey,
      type: RelationshipType.OneToMany,
      name,
    });
  };
}
