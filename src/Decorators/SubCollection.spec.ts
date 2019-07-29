import SubCollection from './SubCollection';
import { expect } from 'chai';
import { MetadataStorage, Initialize } from '../MetadataStorage';

describe('SubCollectionDecorator', () => {
  const store = { metadataStorage: new MetadataStorage() };

  beforeEach(() => {
    store.metadataStorage = new MetadataStorage();
    Initialize(null, store);
  });

  it('should register subCollections', () => {
    class SubEntity {}
    class Entity {
      @SubCollection(SubEntity, 'subentities')
      readonly subentity: null;
    }

    expect(store.metadataStorage.subCollections.length).to.eql(1);
    expect(store.metadataStorage.subCollections[0].name).to.eql('subentities');
    expect(store.metadataStorage.subCollections[0].parentEntity).to.eql(Entity);
    expect(store.metadataStorage.subCollections[0].entity).to.eql(SubEntity);
    expect(store.metadataStorage.subCollections[0].propertyKey).to.eql(
      'subentity'
    );
  });

  it('should register subCollections with default name', () => {
    class SubEntity {}
    class Entity {
      @SubCollection(SubEntity)
      readonly subentity: null;
    }

    expect(store.metadataStorage.subCollections.length).to.eql(1);
    expect(store.metadataStorage.subCollections[0].name).to.eql('subentities');
    expect(store.metadataStorage.subCollections[0].parentEntity).to.eql(Entity);
    expect(store.metadataStorage.subCollections[0].entity).to.eql(SubEntity);
    expect(store.metadataStorage.subCollections[0].propertyKey).to.eql(
      'subentity'
    );
  });

  it('should register a field metadata', () => {
    class SubEntity {}
    class Entity {
      @SubCollection(SubEntity)
      readonly subentity: null;
    }

    const fieldsMetadata = store.metadataStorage.getFields(Entity);
    expect(fieldsMetadata.length).to.eql(1);
    expect(fieldsMetadata[0].entity).to.eql(Entity);
    expect(fieldsMetadata[0].propertyKey).to.eql('subentity');
    expect(fieldsMetadata[0].type).to.eql('subcollection');
  });
});
