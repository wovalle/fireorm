import { Collection } from './Collection';

const setCollection = jest.fn();
jest.mock('../MetadataUtils', () => ({
  getMetadataStorage: () => ({
    setCollection,
  }),
}));

describe('CollectionDecorator', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should register collections', () => {
    @Collection('foo')
    class Entity {
      id: string;
    }

    expect(setCollection).toHaveBeenCalledWith({
      name: 'foo',
      entityConstructor: Entity,
    });
  });

  it('should register collections with default name', () => {
    @Collection()
    class Entity {
      id: string;
    }

    expect(setCollection).toHaveBeenCalledWith({
      name: 'Entities',
      entityConstructor: Entity,
    });
  });
});
