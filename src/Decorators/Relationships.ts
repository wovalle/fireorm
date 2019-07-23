import { getMetadataStorage } from '../MetadataStorage';
import { InstanstiableIEntity, RelationshipType } from '..';

export function OneToMany<T, K extends InstanstiableIEntity>(
  foreignEntity: K,
  primaryKey: keyof T & string,
  foreignKey: string,
  lazy: boolean = true
): Function {
  return function(primary: T, propertyKey: string) {
    const primaryEntity = primary.constructor as InstanstiableIEntity;
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
      lazy,
    });
  };
}
