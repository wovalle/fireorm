import BaseFirestoreRepository from './BaseFirestoreRepository';
import { getFixture, Album } from '../test/fixture';
import { expect } from 'chai';
import { Collection, SubCollection, ISubCollection, Initialize } from '.';
const MockFirebase = require('mock-cloud-firestore');

@Collection('bands')
export class Band {
  id: string;
  name: string;
  formationYear: number;
  lastShow: Date;
  genres: Array<string>;
  @SubCollection(Album)
  albums?: ISubCollection<Album>;
}

class BandRepository extends BaseFirestoreRepository<Band> {}

describe('BaseRepository', () => {
  let bandRepository: BaseFirestoreRepository<Band> | null = null;

  beforeEach(() => {
    const fixture = Object.assign({}, getFixture());
    const firebase = new MockFirebase(fixture, {
      isNaiveSnapshotListenerEnabled: false,
    });

    const firestore = firebase.firestore();
    Initialize(firestore);
    bandRepository = new BandRepository('bands');
  });

  describe('limit', () => {
    it('must limit the documents in a collection', async () => {
      const twoBands = await bandRepository.limit(2);
      expect(twoBands.length).to.equal(2);
    });

    it('must limit the results of a query', async () => {
      const eightiesBands = await bandRepository
        .whereGreaterOrEqualThan('formationYear', 1980)
        .limit(1)
        .find();
      expect(eightiesBands.length).to.equal(1);
    });

    it('must not throw any exceptions if a query with no results is limited', async () => {
      const oldBands = await bandRepository
        .whereLessOrEqualThan('formationYear', 1930)
        .limit(4)
        .find();
      expect(oldBands.length).to.equal(0);
    })
  })

  describe('findById', () => {
    it('must find by id', async () => {
      const pt = await bandRepository.findById('porcupine-tree');
      expect(pt.id).to.equal('porcupine-tree');
      expect(pt.name).to.equal('Porcupine Tree');
    });
    it('must return T'); // TODO: Right now roy instanceof User === false, investigate
    it('return null if not found', async () => {
      const sw = await bandRepository.findById('steven-wilson');
      expect(sw).to.be.null;
    });
  });

  describe('create', () => {
    it('should return T when an item is created');
    it('must create items when id is passed', async () => {
      const entity = new Band();
      entity.id = 'perfect-circle';
      entity.name = 'A Perfect Circle';
      entity.formationYear = 1999;
      entity.genres = ['alternative-rock', 'alternative-metal', 'hard-rock'];

      const band = await bandRepository.create(entity);
      expect(band.id).to.equal(entity.id);
      expect(band.name).to.equal(entity.name);
      expect(band.formationYear).to.equal(entity.formationYear);
      expect(band.genres).to.equal(entity.genres);
    });

    it('must create items and assign a custom id if no id is passed', async () => {
      const entity = new Band();
      entity.name = 'The Pinapple Thief';
      entity.formationYear = 1999;
      entity.genres = ['progressive-rock'];

      const band = await bandRepository.create(entity);
      expect(typeof band.id).to.equal('string');
      expect(band.id).not.to.be.undefined;
      expect(band.name).to.equal(entity.name);
      expect(band.formationYear).to.equal(entity.formationYear);
      expect(band.genres).to.equal(entity.genres);
    });
  });

  describe('update', () => {
    it('must update and return updated item', async () => {
      const band = await bandRepository.findById('porcupine-tree');
      band.name = 'Steven Wilson';
      const updatedBand = await bandRepository.update(band);
      expect(band.name).to.equal(updatedBand.name);
    });
    it('must only update changed fields'); // TODO: Discuss
    it('must throw if item is not found');
  });

  describe('delete', () => {
    it('must delete item', async () => {
      await bandRepository.delete('porcupine-tree');
      const roy = await bandRepository.findById('porcupine-tree');
      expect(roy).to.be.null;
    });

    it('must throw if item is not found', async () => {
      //tslint:disable-next-line:rule1 no-void-expression
      expect(await bandRepository.delete('lol')).to.throw;
    });
  });

  describe('.where*', () => {
    it('must return T[]');

    it("must return same list if where filter doesn't apply", async () => {
      const list = await bandRepository
        .whereGreaterOrEqualThan('formationYear', 1983)
        .find();
      expect(list.length).to.equal(2);
    });

    it('must filter with whereEqualTo', async () => {
      const list = await bandRepository
        .whereEqualTo('name', 'Porcupine Tree')
        .find();
      expect(list.length).to.equal(1);
      expect(list[0].name).to.equal('Porcupine Tree');
    });

    it('must filter with whereGreaterThan', async () => {
      const list = await bandRepository
        .whereGreaterThan('formationYear', 1983)
        .find();
      expect(list.length).to.equal(1);
    });

    it('must filter with whereGreaterOrEqualThan', async () => {
      const list = await bandRepository
        .whereGreaterOrEqualThan('formationYear', 1983)
        .find();
      expect(list.length).to.equal(2);
    });

    it('must filter with whereLessThan', async () => {
      const list = await bandRepository
        .whereLessThan('formationYear', 1983)
        .find();

      expect(list.length).to.equal(1);
    });

    it('must filter with whereLessOrEqualThan', async () => {
      const list = await bandRepository
        .whereLessOrEqualThan('formationYear', 1983)
        .find();
      expect(list.length).to.equal(2);
    });

    it('must filter with whereArrayContains', async () => {
      const list = await bandRepository
        .whereArrayContains('genres', 'progressive-rock')
        .find();
      expect(list.length).to.equal(2);
    });

    it('must filter with two or more operators', async () => {
      const list = await bandRepository
        .whereLessOrEqualThan('formationYear', 1983)
        .whereArrayContains('genres', 'funk-rock')
        .find();
      expect(list.length).to.equal(1);
      expect(list[0].id).to.equal('red-hot-chili-peppers');
    });
  });

  describe('miscellanious', () => {
    it('should correctly parse dates', async () => {
      const pt = await bandRepository.findById('porcupine-tree');
      expect(pt.lastShow).instanceOf(Date);
      expect(pt.lastShow.toISOString()).to.equal('2010-10-14T00:00:00.000Z');
    });
  });

  describe('must handle subcollections', () => {
    it('should initialize subcollections', async () => {
      const pt = await bandRepository.findById('porcupine-tree');
      expect(pt.name).to.equal('Porcupine Tree');
      expect(pt.albums).to.be.instanceOf(BaseFirestoreRepository);
    });

    it('should be able to execute operations in the subcollection', async () => {
      const band = await bandRepository.findById('red-hot-chili-peppers');
      const bestAlbum = await band.albums.findById('stadium-arcadium');
      expect(bestAlbum.id).to.equal('stadium-arcadium');
    });

    describe('miscellaneous', () => {
      it('should correctly parse dates', async () => {
        const pt = await bandRepository.findById('porcupine-tree');
        const { releaseDate } = await pt.albums.findById('deadwing');
        expect(releaseDate).instanceOf(Date);
        expect(releaseDate.toISOString()).to.equal('2005-03-25T00:00:00.000Z');
      });
    });
  });
});
