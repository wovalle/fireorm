import { getMetadataStorage } from '../MetadataStorage';
import { InstanstiableIEntity, RelationshipType } from '..';
import { TInstanstiableIEntity, IEntity } from '../types';

const toCamelCase = (str: string) => {
  // Lower cases the string
  return (
    str
      .toLowerCase()
      // Replaces any - or _ characters with a space
      .replace(/[-_]+/g, ' ')
      // Removes any non alphanumeric characters
      .replace(/[^\w\s]/g, '')
      // Uppercases the first character in each group immediately following a space
      // (delimited by spaces)
      .replace(/ (.)/g, function($1) {
        return $1.toUpperCase();
      })
      // Removes spaces
      .replace(/ /g, '')
  );
};

type IRelationshipOptions = {
  lazy?: boolean;
  relField?: string;
};

export function hasMany<T extends IEntity>(
  foreignEntity: TInstanstiableIEntity<T>,
  opt?: IRelationshipOptions
): Function {
  return function(primary: InstanstiableIEntity, propertyKey: string) {
    const primaryEntity = primary.constructor as InstanstiableIEntity;

    const options = { lazy: true, ...opt };

    const relationField = options.relField
      ? options.relField
      : toCamelCase(primaryEntity.name + '_id');

    getMetadataStorage().setRelationships({
      primaryEntity,
      foreignEntity,
      foreignKey: relationField,
      propertyKey,
      type: RelationshipType.OneToMany,
      lazy: options.lazy,
    });
  };
}

export function belongsTo<T extends IEntity>(
  primaryEntity: TInstanstiableIEntity<T>,
  opt?: IRelationshipOptions
): Function {
  return function(foreign: InstanstiableIEntity, propertyKey: string) {
    const foreignEntity = foreign.constructor as InstanstiableIEntity;

    const options = { lazy: true, ...opt };

    const relationField = options.relField
      ? options.relField
      : toCamelCase(primaryEntity.name + '_id');

    getMetadataStorage().setRelationships({
      primaryEntity,
      foreignEntity,
      foreignKey: relationField,
      propertyKey,
      type: RelationshipType.ManyToOne,
      lazy: options.lazy,
    });
  };
}
