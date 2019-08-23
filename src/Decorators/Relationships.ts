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

export function ManyToOne<T, T2>(
  primaryEntity: any,
  a: (t: T) => Promise<T2[]>,
  primaryKeyFactory: (t2: T2) => unknown,
  opt: IRelationshipOptions = { lazy: true }
): Function {
  return function(foreign: { new (...args: any[]): T }, propertyKey: string) {
    const foreignEntity = foreign.constructor as InstanstiableIEntity;
    const foreignKey = getPath(primaryKeyFactory) as string[];

    getMetadataStorage().setRelationships({
      primaryEntity,
      foreignEntity,
      foreignKey,
      propertyKey,
      type: RelationshipType.ManyToOne,
      lazy: opt.lazy,
    });
  };
}

class Baz {
  id: string;
}

class Foo {
  id: string;
  barId: string;

  // @RelationKey(Baz)
  bazId: string;

  @ManyToOne<Foo>(Baz, foo => baz.id)
  bars: Baz[];
}

class Bar {
  id: string;

  @OneToMany(Foo, f => f.barId)
  foo: Promise<Foo>;
}

function DecorateClass<T>(
  instantiate: (...args: any[]) => T,
  second: (t: T) => unknown
) {
  return (classTarget: { new (...args: any[]): T }) => {
    /*...*/
  };
}

const a: () => Animal = null;
@DecorateClass(a, t => t.Name)
class Animal {
  public Name: string;
  public Sound: string;
}

function getAnimal() {
  return new Animal();
}
