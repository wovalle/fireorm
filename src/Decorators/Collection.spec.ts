import Collection from './Collection';
import { expect } from 'chai';

describe('CollectionDecorator', () => {
  let globalRef: any = null;
  const metadataStorage = { collections: [] };

  const getStorage: any = () => global;
  before(() => {
    const globalObj = getStorage();
    globalRef = globalObj;
    globalObj.metadataStorage = metadataStorage;
  });

  afterEach(() => {
    metadataStorage.collections = [];
  });

  after(() => {
    global = globalRef;
  });

  it('should register collections', () => {
    @Collection('foo')
    class Entity {}

    expect(metadataStorage.collections.length).to.eql(1);
    expect(metadataStorage.collections[0].name).to.eql('foo');
    expect(metadataStorage.collections[0].target).to.eql(Entity);
  });

  it('should register collections with default name', () => {
    @Collection()
    class Entity {}

    expect(metadataStorage.collections.length).to.eql(1);
    expect(metadataStorage.collections[0].name).to.eql('Entities');
    expect(metadataStorage.collections[0].target).to.eql(Entity);
  });
});
