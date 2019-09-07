import BaseFirestoreRepository from './BaseFirestoreRepository';
import { getFixture, Album, Coordinates } from '../test/fixture';
import { expect } from 'chai';
import { Collection, SubCollection, ISubCollection, Initialize } from '.';
import { Type } from './';
import { MetadataStorage } from './MetadataStorage';
const MockFirebase = require('mock-cloud-firestore');
import monkeyPatchFirestoreTran from '../test/monkey-patch-firestore-transaction';

const store = { metadataStorage: new MetadataStorage() };
Initialize(null, store);

@Collection('bands')
class Band {
  id: string;
  name: string;
  formationYear: number;
  lastShow: Date;

  // Todo create fireorm bypass decorator
  @Type(() => Coordinates)
  lastShowCoordinates: Coordinates;
  genres: Array<string>;

  @SubCollection(Album)
  albums?: ISubCollection<Album>;

  getLastShowYear() {
    return this.lastShow.getFullYear();
  }

  getPopularGenre() {
    return this.genres[0];
  }
}

class BandRepository extends BaseFirestoreRepository<Band> {}

describe('BaseRepository', () => {
  let bandRepository: BaseFirestoreRepository<Band> = null;

  beforeEach(() => {
    const fixture = Object.assign({}, getFixture());
    const firebase = new MockFirebase(fixture, {
      isNaiveSnapshotListenerEnabled: false,
    });

    const firestore = firebase.firestore();
    monkeyPatchFirestoreTran(firestore);
    Initialize(firestore, store);
    bandRepository = new BandRepository('bands');
  });

  describe('limit', () => {
    it('must limit the documents in a collection', async () => {
      const twoBands = await bandRepository.limit(2).find();
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
    });

    it('must limit subcollections', async () => {
      const pt = await bandRepository.findById('porcupine-tree');
      const albumsSubColl = pt.albums;
      const albumsLimited = await albumsSubColl.limit(2).find();
      expect(albumsLimited.length).to.equal(2);
    });

    it('must throw an exception if limit call more than once', async () => {
      expect(() =>
        bandRepository
          .limit(2)
          .limit(2)
          .find()
      ).to.throw();
    });
  });

  describe('orderByAscending', () => {
    it('must order repository objects', async () => {
      const bands = await bandRepository
        .orderByAscending('formationYear')
        .find();
      expect(bands[0].id).to.equal('pink-floyd');
    });

    it('must order the objects in a subcollection', async () => {
      const pt = await bandRepository.findById('porcupine-tree');
      const albumsSubColl = pt.albums;
      const discographyNewestFirst = await albumsSubColl
        .orderByAscending('releaseDate')
        .find();
      expect(discographyNewestFirst[0].id).to.equal('lightbulb-sun');
    });

    it('must be chainable with where* filters', async () => {
      const pt = await bandRepository.findById('porcupine-tree');
      const albumsSubColl = pt.albums;
      const discographyNewestFirst = await albumsSubColl
        .whereGreaterOrEqualThan('releaseDate', new Date('2001-01-01'))
        .orderByAscending('releaseDate')
        .find();
      expect(discographyNewestFirst[0].id).to.equal('in-absentia');
    });

    it('must be chainable with limit', async () => {
      const bands = await bandRepository
        .orderByAscending('formationYear')
        .limit(2)
        .find();
      const lastBand = bands[bands.length - 1];
      expect(lastBand.id).to.equal('red-hot-chili-peppers');
    });

    it('must throw an Error if an orderBy* function is called more than once in the same expression', async () => {
      const pt = await bandRepository.findById('porcupine-tree');
      const albumsSubColl = pt.albums;
      expect(() => {
        albumsSubColl
          .orderByAscending('releaseDate')
          .orderByDescending('releaseDate');
      }).to.throw;
    });
  });

  describe('orderByDescending', () => {
    it('must order repository objects', async () => {
      const bands = await bandRepository
        .orderByDescending('formationYear')
        .find();
      expect(bands[0].id).to.equal('porcupine-tree');
    });

    it('must order the objects in a subcollection', async () => {
      const pt = await bandRepository.findById('porcupine-tree');
      const albumsSubColl = pt.albums;
      const discographyNewestFirst = await albumsSubColl
        .orderByDescending('releaseDate')
        .find();
      expect(discographyNewestFirst[0].id).to.equal('fear-blank-planet');
    });

    it('must be chainable with where* filters', async () => {
      const pt = await bandRepository.findById('porcupine-tree');
      const albumsSubColl = pt.albums;
      const discographyNewestFirst = await albumsSubColl
        .whereGreaterOrEqualThan('releaseDate', new Date('2001-01-01'))
        .orderByDescending('releaseDate')
        .find();
      expect(discographyNewestFirst[0].id).to.equal('fear-blank-planet');
    });

    it('must be chainable with limit', async () => {
      const bands = await bandRepository
        .orderByDescending('formationYear')
        .limit(2)
        .find();
      const lastBand = bands[bands.length - 1];
      expect(lastBand.id).to.equal('red-hot-chili-peppers');
    });

    it('must throw an Error if an orderBy* function is called more than once in the same expression', async () => {
      const pt = await bandRepository.findById('porcupine-tree');
      const albumsSubColl = pt.albums;
      expect(() => {
        albumsSubColl
          .orderByAscending('releaseDate')
          .orderByDescending('releaseDate');
      }).to.throw;
    });
  });

  describe('findById', () => {
    it('must find by id', async () => {
      const pt = await bandRepository.findById('porcupine-tree');
      expect(pt).instanceOf(Band);
      expect(pt.id).to.equal('porcupine-tree');
      expect(pt.name).to.equal('Porcupine Tree');
    });

    it('must have proper getters', async () => {
      const pt = await bandRepository.findById('porcupine-tree');
      expect(pt.getLastShowYear()).to.eql(2010);
    });

    it('return null if not found', async () => {
      const sw = await bandRepository.findById('steven-wilson');
      expect(sw).to.be.null;
    });
  });

  describe('create', () => {
    it('should return T when an item is created', async () => {
      const entity = new Band();
      entity.id = 'rush';
      entity.name = 'Rush';
      entity.formationYear = 1968;
      entity.genres = ['progressive-rock', 'hard-rock', 'heavy-metal'];

      const band = await bandRepository.create(entity);
      expect(band).to.be.instanceOf(Band);
      expect(band.getPopularGenre()).to.equal('progressive-rock');
    });

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

    it('must save autogenerated id field in document if no id is passed', async () => {
      const entity = new Band();
      entity.name = 'Deftones';
      entity.formationYear = 1988;
      entity.genres = ['alternative-metal'];

      const band = await bandRepository.create(entity);
      const foundBand = await bandRepository.findById(band.id);

      expect(band.id).to.equal(foundBand.id);
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
    it('whereEqualTo must accept function as first parameter', async () => {
      const list = await bandRepository
        .whereEqualTo(b => b.name, 'Porcupine Tree')
        .find();
      expect(list.length).to.equal(1);
      expect(list[0].name).to.equal('Porcupine Tree');
    });

    it('must return T[]', async () => {
      const progressiveRockBands = await bandRepository
        .whereArrayContains('genres', 'progressive-rock')
        .find();

      progressiveRockBands.forEach(b => {
        expect(b.getPopularGenre()).to.eql(b.genres[0]);
      });
    });

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

  describe('miscellaneous', () => {
    it('should correctly parse dates', async () => {
      const pt = await bandRepository.findById('porcupine-tree');
      expect(pt.lastShow).to.be.instanceOf(Date);
      expect(pt.lastShow.toISOString()).to.equal('2010-10-14T00:00:00.000Z');
    });

    it('should correctly parse geopoints', async () => {
      const pt = await bandRepository.findById('porcupine-tree');
      expect(pt.lastShowCoordinates).to.be.instanceOf(Coordinates);
      expect(pt.lastShowCoordinates.latitude).to.equal(51.5009088);
      expect(pt.lastShowCoordinates.longitude).to.equal(-0.1795547);
    });
  });

  describe.only('transactions', () => {
    // TODO: firestore mock does not have support for runTransaction :( gotta find how to test it
    it('should be able to open transactions', async () => {
      await bandRepository.runTransaction(async tran => {
        const band = await tran.findById('porcupine-tree');
        band.name = 'Árbol de Puercoespín';
        await tran.update(band);
      });

      const updated = await bandRepository.findById('porcupine-tree');
      expect(updated.name).to.eql('Árbol de Puercoespín');
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

    it('should be able to create subcollections', async () => {
      const band = new Band();
      band.id = '30-seconds-to-mars';
      band.name = '30 Seconds To Mars';
      band.formationYear = 1998;
      band.genres = ['alternative-rock'];

      await bandRepository.create(band);

      const firstAlbum = new Album();
      firstAlbum.id = '30-seconds-to-mars';
      firstAlbum.name = '30 Seconds to Mars';
      firstAlbum.releaseDate = new Date('2002-07-22');

      const secondAlbum = new Album();
      secondAlbum.id = 'a-beautiful-lie';
      secondAlbum.name = 'A Beautiful Lie';
      secondAlbum.releaseDate = new Date('2005-07-30');

      const thirdAlbum = new Album();
      thirdAlbum.id = 'this-is-war';
      thirdAlbum.name = 'This Is War';
      thirdAlbum.releaseDate = new Date('2009-12-08');

      await band.albums.create(firstAlbum);
      await band.albums.create(secondAlbum);
      await band.albums.create(thirdAlbum);

      const albums = await band.albums.find();
      expect(albums.length).to.eql(3);
    });

    it('should be able to update subcollections', async () => {
      const pt = await bandRepository.findById('porcupine-tree');
      const album = await pt.albums.findById('fear-blank-planet');
      album.comment = 'Anesthethize is top 3 IMHO';

      await pt.albums.update(album);

      const updatedAlbum = await pt.albums.findById('fear-blank-planet');
      expect(updatedAlbum.comment).to.eql('Anesthethize is top 3 IMHO');
    });

    it('should be able to update collections with subcollections', async () => {
      const pt = await bandRepository.findById('porcupine-tree');
      pt.name = 'Porcupine Tree IS THE BEST';
      const updatedPt = await bandRepository.update(pt);
      const foundUpdatedPt = await bandRepository.update(pt);

      expect(updatedPt.name).to.eql(pt.name);
      expect(foundUpdatedPt.name).to.eql(pt.name);
    });

    it('should be able to delete subcollections', async () => {
      const pt = await bandRepository.findById('porcupine-tree');
      await pt.albums.delete('fear-blank-planet');

      const updatedBandAlbums = await pt.albums.find();
      expect(updatedBandAlbums.length).to.eql(3);
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
