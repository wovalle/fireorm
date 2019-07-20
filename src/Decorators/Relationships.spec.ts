import { expect } from 'chai';
import { MetadataStorage, Initialize } from '../MetadataStorage';
import { Collection, RelationshipType } from '..';
import { OneToMany } from './Relationships';

describe('RelationshipsDecorators', () => {
  const store = { metadataStorage: new MetadataStorage() };

  beforeEach(() => {
    store.metadataStorage = new MetadataStorage();
    Initialize(null, store);
  });

  it('must register OneToMany relationships', async () => {
    class Bar {
      id: string;
      fooId: string;
    }

    @Collection('foo')
    class Foo {
      id: string;

      @OneToMany(Bar, 'id', 'fooId')
      bars: Array<Bar>;
    }

    const rel = store.metadataStorage.getRelationships(Foo)[0];
    expect(rel.primaryEntity).to.equal(Foo);
    expect(rel.primaryKey).to.equal('id');
    expect(rel.foreignEntity).to.equal(Bar);
    expect(rel.foreignKey).to.equal('fooId');
    expect(rel.propertyKey).to.equal('bars');
    expect(rel.type).to.equal(RelationshipType.OneToMany);
  });
});
