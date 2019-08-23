import { expect } from 'chai';
import { MetadataStorage, Initialize } from '../MetadataStorage';
import { RelationshipType } from '..';
import { hasMany, belongsTo } from './Relationships';

// TODO: eager/lazy (lazy as default) [ok]
// TODO: validate duplicated relationships
// TODO: cascade update/save?
// TODO: circular relationships?
// TODO: ManyToMany
// TODO: @Primary [ok] [revisit]
// TODO: Handle foreigns with deep fieldss
// TODO: mock for BandLabel [ok]
// TODO: what to do with foreign rels
// TODO: for now only taking first element of foreignKeys [n/a]
// TODO: actually using @Primary, baserep, handleRels [n/a]
describe('RelationshipsDecorators', () => {
  const store = { metadataStorage: new MetadataStorage() };

  beforeEach(() => {
    store.metadataStorage = new MetadataStorage();
    Initialize(null, store);
  });

  describe('hasMany', () => {
    it('must register hasMany relationships with default fields', async () => {
      class Member {
        id: string;
        fooId: string;
      }

      class Band {
        id: string;

        @hasMany(Member)
        members: Array<Member>;
      }

      const rel = store.metadataStorage.getRelationships(Band)[0];
      expect(rel.primaryEntity).to.equal(Band);
      expect(rel.foreignEntity).to.equal(Member);
      expect(rel.foreignKey).to.eql('bandId');
      expect(rel.propertyKey).to.equal('members');
      expect(rel.type).to.equal(RelationshipType.OneToMany);
    });

    it('must register hasMany relationships with custom fields', async () => {
      class Member {
        id: string;
        relId: string;
      }

      class Band {
        id: string;

        @hasMany(Member, { relField: 'relId' })
        bars: Array<Member>;
      }

      const rel = store.metadataStorage.getRelationships(Member)[0];
      expect(rel.primaryEntity).to.equal(Band);
      expect(rel.foreignEntity).to.equal(Member);
      expect(rel.foreignKey).to.eql('relId');
      expect(rel.propertyKey).to.equal('bars');
      expect(rel.type).to.equal(RelationshipType.OneToMany);
    });

    it('should register a field metadata', () => {
      class Member {
        id: string;
        fooId: string;
      }

      class Band {
        id: string;

        @hasMany(Member)
        bars: Array<Member>;
      }

      const fieldsMetadata = store.metadataStorage.getFields(Band);
      expect(fieldsMetadata.length).to.eql(1);
      expect(fieldsMetadata[0].entity).to.eql(Band);
      expect(fieldsMetadata[0].propertyKey).to.eql('bars');
      expect(fieldsMetadata[0].type).to.eql('relationship');
    });

    it("shouldn't return duplicated relationships");
  });

  describe('belongsTo', () => {
    it('must register belongsTo relationships with default fields', async () => {
      class Band {
        id: string;
      }

      class Member {
        id: string;
        bandId: string;

        @belongsTo(Band)
        band: Promise<Band>;
      }

      const rel = store.metadataStorage.getRelationships(Member)[0];
      expect(rel.primaryEntity).to.equal(Band);
      expect(rel.foreignEntity).to.equal(Member);
      expect(rel.foreignKey).to.eql('bandId');
      expect(rel.propertyKey).to.equal('band');
      expect(rel.type).to.equal(RelationshipType.ManyToOne);
    });

    it('must register hasMany relationships with custom fields', async () => {
      class Band {
        id: string;
      }

      class Member {
        id: string;
        bandId: string;

        @belongsTo(Band, { relField: 'relId' })
        band: Promise<Band>;
      }

      const rel = store.metadataStorage.getRelationships(Member)[0];
      expect(rel.primaryEntity).to.equal(Band);
      expect(rel.foreignEntity).to.equal(Member);
      expect(rel.foreignKey).to.eql('relId');
      expect(rel.propertyKey).to.equal('band');
      expect(rel.type).to.equal(RelationshipType.ManyToOne);
    });

    it('should register a field metadata', () => {
      class Band {
        id: string;
      }

      class Member {
        id: string;
        bandId: string;

        @belongsTo(Band)
        band: Promise<Band>;
      }

      // TODO: Have to check fieldMetadata again
      const fieldsMetadata = store.metadataStorage.getFields(Band);
      expect(fieldsMetadata.length).to.eql(1);
      expect(fieldsMetadata[0].entity).to.eql(Band);
      expect(fieldsMetadata[0].propertyKey).to.eql('band');
      expect(fieldsMetadata[0].type).to.eql('relationship');
    });

    it("shouldn't return duplicated relationships");
  });
});
