import { expect } from 'chai';
import { MetadataStorage, Initialize } from '../MetadataStorage';
import { Collection, RelationshipType } from '..';
import { OneToMany } from './Relationships';

// TODO: eager/lazy (lazy as default) [ok]
// TODO: validate duplicated relationships [ok]
// TODO: cascade update/save?
// TODO: circular relationships?
// TODO: ManyToMany
// TODO: @Primary
// TODO: Handle foreigns with deep fields
// TODO: mock for BandLabel
// TODO: what to do with foreign rels
// TODO: for now only taking first element of foreignKeys
describe('RelationshipsDecorators', () => {
  const store = { metadataStorage: new MetadataStorage() };

  beforeEach(() => {
    store.metadataStorage = new MetadataStorage();
    Initialize(null, store);
  });

  it('must register OneToMany relationships and find them from primary', async () => {
    class Bar {
      id: string;
      fooId: string;
    }

    @Collection()
    class Foo {
      id: string;

      @OneToMany(Bar, b => b.fooId)
      bars: Array<Bar>;
    }

    const rel = store.metadataStorage.getRelationships(Foo)[0];
    expect(rel.primaryEntity).to.equal(Foo);
    expect(rel.primaryKey).to.equal('id');
    expect(rel.foreignEntity).to.equal(Bar);
    expect(rel.foreignKey).to.eql(['fooId']);
    expect(rel.propertyKey).to.equal('bars');
    expect(rel.type).to.equal(RelationshipType.OneToMany);
  });

  it('must register OneToMany relationships and find them from foreign', async () => {
    class Bar {
      id: string;
      fooId: string;
    }

    @Collection()
    class Foo {
      id: string;

      @OneToMany(Bar, b => b.fooId)
      bars: Array<Bar>;
    }

    const rel = store.metadataStorage.getRelationships(Bar)[0];
    expect(rel.primaryEntity).to.equal(Foo);
    expect(rel.primaryKey).to.equal('id');
    expect(rel.foreignEntity).to.equal(Bar);
    expect(rel.foreignKey).to.eql(['fooId']);
    expect(rel.propertyKey).to.equal('bars');
    expect(rel.type).to.equal(RelationshipType.OneToMany);
  });

  it("shouldn't return duplicated relationships");
});
