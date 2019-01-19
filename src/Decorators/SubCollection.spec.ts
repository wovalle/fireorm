import SubCollection from './SubCollection';
import { expect } from 'chai';

describe('SubCollectionDecorator', () => {
  let globalRef: any = null;
  const metadataStorage = { subCollections: [] };

  const getStorage: any = () => global;
  before(() => {
    const globalObj = getStorage();
    globalRef = globalObj;
    globalObj.metadataStorage = metadataStorage;
  });

  afterEach(() => {
    metadataStorage.subCollections = [];
  });

  after(() => {
    global = globalRef;
  });

  it('should register collections', () => {
    class SubEntity {}
    class Entity {
      @SubCollection(SubEntity, 'subentities')
      readonly subentity: null;
    }

    expect(metadataStorage.subCollections.length).to.eql(1);
    expect(metadataStorage.subCollections[0].name).to.eql('subentities');
    expect(metadataStorage.subCollections[0].target).to.eql(Entity);
    expect(metadataStorage.subCollections[0].entity).to.eql(SubEntity);
  });

  it('should register collections with default name', () => {
    class SubEntity {}
    class Entity {
      @SubCollection(SubEntity)
      readonly subentity: null;
    }

    expect(metadataStorage.subCollections.length).to.eql(1);
    expect(metadataStorage.subCollections[0].name).to.eql('subentities');
    expect(metadataStorage.subCollections[0].target).to.eql(Entity);
    expect(metadataStorage.subCollections[0].entity).to.eql(SubEntity);
  });
});
