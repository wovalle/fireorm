import Collection from './Collection';
import { expect } from 'chai';
import sinon from 'sinon';

describe('CollectionDecorator', () => {
  let stub = null;
  const metadataStorage = { collections: [] };

  before(() => {
    stub = sinon
      .stub(global as any, 'metadataStorage')
      .returns(metadataStorage);
  });

  afterEach(() => {
    metadataStorage.collections = [];
  });

  after(() => stub.restore());

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
