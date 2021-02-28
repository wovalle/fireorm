import { SubCollection } from './SubCollection';
import { Reference } from './DocumentReference';
import { IEntityReference, ISubCollection } from '../types';
import { Collection } from './Collection';

const setReference = jest.fn();
const setCollection = jest.fn();
jest.mock('../MetadataUtils', () => ({
  getMetadataStorage: () => ({
    setCollection,
    setReference,
  }),
}));

describe('DocumentReferenceDecorator', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should register references', () => {
    class EntityReferenced {
      public id: string;
    }

    class SubEntity {
      public id: string;

      @Reference(EntityReferenced)
      subReference: IEntityReference<EntityReferenced>;
    }

    @Collection()
    class Entity {
      id: string;

      @Reference(EntityReferenced)
      reference: IEntityReference<EntityReferenced>;

      @SubCollection(SubEntity)
      subentity: ISubCollection<SubEntity>;
    }

    expect(setReference).toHaveBeenNthCalledWith(1, {
      origin: SubEntity,
      target: EntityReferenced,
      propertyKey: 'subReference',
    });

    expect(setReference).toHaveBeenNthCalledWith(2, {
      origin: Entity,
      target: EntityReferenced,
      propertyKey: 'reference',
    });
  });
});
