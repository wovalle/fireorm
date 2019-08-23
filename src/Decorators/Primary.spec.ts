import { expect } from 'chai';
import { MetadataStorage, Initialize } from '../MetadataStorage';
import Primary from './Primary';
import { hasMany } from './Relationships';
import SubCollection from './SubCollection';

describe('PrimaryDecorator', () => {
  const store = { metadataStorage: new MetadataStorage() };

  beforeEach(() => {
    store.metadataStorage = new MetadataStorage();
    Initialize(null, store);
  });

  it('should register primary with property decorator', () => {
    class Entity {
      id: string;

      @Primary
      primaryId: string;
    }

    const field = store.metadataStorage.getPrimary(Entity);
    expect(store.metadataStorage.fields.length).to.eql(1);
    expect(field.type).to.eql('primary');
    expect(field.entity).to.eql(Entity);
    expect(field.propertyKey).to.eql('primaryId');
  });

  it('should prevent duplicated Primary', () => {
    expect(() => {
      class Entity {
        id: string;

        @Primary
        primaryId: string;

        @Primary
        anotherId: string;
      }
    }).to.throw();
  });

  it('should prevent using primary field for hasMany Relationships', () => {
    expect(() => {
      class Foo {
        id: string;
      }

      class Entity {
        id: string;

        @Primary
        @hasMany(Foo)
        anotherId: string;
      }
    }).to.throw();
  });

  it('should prevent using primary field for SubCollections Relationships', () => {
    expect(() => {
      class Foo {
        id: string;
      }

      class Entity {
        id: string;

        @Primary
        @SubCollection(Foo)
        anotherId: string;
      }
    }).to.throw();
  });
});
