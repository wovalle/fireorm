import { getMetadataStorage } from '../MetadataStorage';
import { InstanstiableIEntity, RelationshipType } from '..';
import { getPath } from 'ts-object-path';
import { TInstanstiableIEntity, IEntity } from '../types';

type IRelationshipOptions = {
  lazy?: boolean;
};

export function OneToMany<T extends IEntity>(
  foreignEntity: TInstanstiableIEntity<T>,
  foreignKeyFactory: (t: T) => unknown,
  opt: IRelationshipOptions = { lazy: true }
): Function {
  return function(primary: InstanstiableIEntity, propertyKey: string) {
    const primaryEntity = primary.constructor as InstanstiableIEntity;
    const foreignKey = getPath(foreignKeyFactory) as string[];

    getMetadataStorage().setRelationships({
      primaryEntity,
      foreignEntity,
      foreignKey,
      propertyKey,
      type: RelationshipType.OneToMany,
      lazy: opt.lazy,
    });
  };
}
