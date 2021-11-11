import { initialize } from './MetadataUtils';
import {
  getFixture,
  Album,
  Coordinates,
  FirestoreDocumentReference,
  AlbumImage,
  Agent,
  Website,
} from '../test/fixture';
import { BaseFirestoreRepository } from './BaseFirestoreRepository';
import { Band } from '../test/BandCollection';
import { Firestore } from '@google-cloud/firestore';
import { NoMetadataError } from './Errors';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const MockFirebase = require('mock-cloud-firestore');

describe('BaseFirestoreRepository', () => {
  class BandRepository extends BaseFirestoreRepository<Band> {}
  let bandRepository: BaseFirestoreRepository<Band> = null;
  let firestore: Firestore = null;

  beforeEach(() => {
    const fixture = Object.assign({}, getFixture());
    const firebase = new MockFirebase(fixture, {
      isNaiveSnapshotListenerEnabled: false,
    });

    firestore = firebase.firestore();
    initialize(firestore);

    bandRepository = new BandRepository('bands');
  });

  describe('constructor', () => {
    it('should correctly initialize a repository with custom path', async () => {
      const bandRepositoryWithPath = new BandRepository('bands');
      const band = await bandRepositoryWithPath.findById('porcupine-tree');
      expect(band.name).toEqual('Porcupine Tree');
    });

    it('should correctly initialize a repository with an entity', async () => {
      const bandRepositoryWithPath = new BandRepository(Band);
      const band = await bandRepositoryWithPath.findById('porcupine-tree');
      expect(band.name).toEqual('Porcupine Tree');
    });

    it('should throw error if initialized with an invalid path', async () => {
      expect(() => new BandRepository('invalidpath')).toThrowError(
        new NoMetadataError('invalidpath')
      );
    });
  });

  describe('limit', () => {
    it('must limit the documents in a collection', async () => {
      const twoBands = await bandRepository.limit(2).find();
      expect(twoBands.length).toEqual(2);
    });

    it('must limit the results of a query', async () => {
      const eightiesBands = await bandRepository
        .whereGreaterOrEqualThan('formationYear', 1980)
        .limit(1)
        .find();
      expect(eightiesBands.length).toEqual(1);
    });

    it('must not throw any exceptions if a query with no results is limited', async () => {
      const oldBands = await bandRepository
        .whereLessOrEqualThan('formationYear', 1688)
        .limit(4)
        .find();
      expect(oldBands.length).toEqual(0);
    });

    it('must limit subcollections', async () => {
      const pt = await bandRepository.findById('porcupine-tree');
      const albums = await pt.albums.limit(2).find();
      expect(albums.length).toEqual(2);
    });

    it('must throw an exception if limit call more than once', async () => {
      expect(() => bandRepository.limit(2).limit(2).find()).toThrow();
    });

    it.todo('must return if limit is 0');
    it.todo('must throw if the limit is less than 0');
  });

  describe('ordering', () => {
    describe('orderByAscending', () => {
      it('must order repository objects', async () => {
        const bands = await bandRepository.orderByAscending('formationYear').find();
        expect(bands[0].id).toEqual('the-speckled-band');
      });

      it('must order the objects in a subcollection', async () => {
        const pt = await bandRepository.findById('porcupine-tree');
        const albumsSubColl = pt.albums;
        const discographyNewestFirst = await albumsSubColl.orderByAscending('releaseDate').find();
        expect(discographyNewestFirst[0].id).toEqual('lightbulb-sun');
      });

      it('must be chainable with where* filters', async () => {
        const pt = await bandRepository.findById('porcupine-tree');
        const albumsSubColl = pt.albums;
        const discographyNewestFirst = await albumsSubColl
          .whereGreaterOrEqualThan('releaseDate', new Date('2001-01-01'))
          .orderByAscending('releaseDate')
          .find();
        expect(discographyNewestFirst[0].id).toEqual('in-absentia');
      });

      it('must be chainable with limit', async () => {
        const bands = await bandRepository.orderByAscending('formationYear').limit(3).find();
        const lastBand = bands[bands.length - 1];
        expect(lastBand.id).toEqual('red-hot-chili-peppers');
      });

      it('must throw an Error if an orderBy* function is called more than once in the same expression', async () => {
        const pt = await bandRepository.findById('porcupine-tree');
        const albumsSubColl = pt.albums;
        expect(() => {
          albumsSubColl.orderByAscending('releaseDate').orderByDescending('releaseDate');
        }).toThrow();
      });

      it('must throw an Error if an orderBy* function is called more than once in the same expression ascending', async () => {
        const pt = await bandRepository.findById('porcupine-tree');
        const albumsSubColl = pt.albums;
        expect(() => {
          albumsSubColl.orderByAscending('releaseDate').orderByAscending('releaseDate');
        }).toThrow();
      });

      it('must succeed when orderBy* function is called more than once in the same expression with different fields', async () => {
        const pt = await bandRepository.findById('porcupine-tree');
        const albumsSubColl = pt.albums;
        expect(() => {
          albumsSubColl.orderByAscending('releaseDate').orderByDescending('name');
        }).not.toThrow();
      });
    });
  });

  describe('orderByDescending', () => {
    it('must order repository objects', async () => {
      const bands = await bandRepository.orderByDescending('formationYear').find();
      expect(bands[0].id).toEqual('porcupine-tree');
    });

    it('must order the objects in a subcollection', async () => {
      const pt = await bandRepository.findById('porcupine-tree');
      const albumsSubColl = pt.albums;
      const discographyNewestFirst = await albumsSubColl.orderByDescending('releaseDate').find();
      expect(discographyNewestFirst[0].id).toEqual('fear-blank-planet');
    });

    it('must be chainable with where* filters', async () => {
      const pt = await bandRepository.findById('porcupine-tree');
      const albumsSubColl = pt.albums;
      const discographyNewestFirst = await albumsSubColl
        .whereGreaterOrEqualThan('releaseDate', new Date('2001-01-01'))
        .orderByDescending('releaseDate')
        .find();
      expect(discographyNewestFirst[0].id).toEqual('fear-blank-planet');
    });

    it('must be chainable with limit', async () => {
      const bands = await bandRepository.orderByDescending('formationYear').limit(2).find();
      const lastBand = bands[bands.length - 1];
      expect(lastBand.id).toEqual('red-hot-chili-peppers');
    });

    it('must throw an Error if an orderBy* function is called more than once in the same expression', async () => {
      const pt = await bandRepository.findById('porcupine-tree');
      const albumsSubColl = pt.albums;
      expect(() => {
        albumsSubColl.orderByAscending('releaseDate').orderByDescending('releaseDate');
      }).toThrow();
    });

    it('must throw an Error if an orderBy* function is called more than once in the same expression descending', async () => {
      const pt = await bandRepository.findById('porcupine-tree');
      const albumsSubColl = pt.albums;
      expect(() => {
        albumsSubColl.orderByDescending('releaseDate').orderByDescending('releaseDate');
      }).toThrow();
    });

    it('must succeed when orderBy* function is called more than once in the same expression with different fields', async () => {
      const pt = await bandRepository.findById('porcupine-tree');
      const albumsSubColl = pt.albums;
      expect(() => {
        albumsSubColl.orderByAscending('releaseDate').orderByDescending('name');
      }).not.toThrow();
    });

    it('must succeed when orderBy* function is called more than once in the same expression with different fields ascending', async () => {
      const pt = await bandRepository.findById('porcupine-tree');
      const albumsSubColl = pt.albums;
      expect(() => {
        albumsSubColl.orderByAscending('releaseDate').orderByAscending('name');
      }).not.toThrow();
    });

    it('must succeed when orderBy* function is called more than once in the same expression with different fields descending', async () => {
      const pt = await bandRepository.findById('porcupine-tree');
      const albumsSubColl = pt.albums;
      expect(() => {
        albumsSubColl.orderByDescending('releaseDate').orderByDescending('name');
      }).not.toThrow();
    });
  });

  describe('findById', () => {
    it('must find by id', async () => {
      const pt = await bandRepository.findById('porcupine-tree');
      expect(pt).toBeInstanceOf(Band);
      expect(pt.id).toEqual('porcupine-tree');
      expect(pt.name).toEqual('Porcupine Tree');
    });

    it('must have proper getters', async () => {
      const pt = await bandRepository.findById('porcupine-tree');
      expect(pt.getLastShowYear()).toEqual(2010);
    });

    it('return null if not found', async () => {
      const sw = await bandRepository.findById('steven-wilson');
      expect(sw).toBeNull();
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
      expect(band).toBeInstanceOf(Band);
      expect(band.getPopularGenre()).toEqual('progressive-rock');
    });

    it('must not validate if the validate config by default', async () => {
      initialize(firestore);

      bandRepository = new BandRepository('bands');

      const entity = new Band();
      entity.contactEmail = 'Not an email';
      const band = await bandRepository.create(entity);

      expect(band.contactEmail).toEqual('Not an email');
    });

    it('must not validate if the validateModels: false', async () => {
      initialize(firestore, { validateModels: false });

      bandRepository = new BandRepository('bands');

      const entity = new Band();
      entity.contactEmail = 'Not an email';
      const band = await bandRepository.create(entity);

      expect(band.contactEmail).toEqual('Not an email');
    });

    it('must not validate forbidden non-whitelisted properties if the validatorOptions: {}', async () => {
      initialize(firestore, { validateModels: true, validatorOptions: {} });

      type BandWithCustomProp = Band & { custom: string };

      const entity = new Band();
      Object.assign(entity, { custom: 'unknown property' });

      const band = (await bandRepository.create(entity)) as unknown as BandWithCustomProp;

      expect(band.custom).toEqual('unknown property');
    });

    it('must validate forbidden non-whitelisted properties if the validatorOptions: { whitelist: true, forbidNonWhitelisted: true }', async () => {
      initialize(firestore, {
        validateModels: true,
        validatorOptions: { whitelist: true, forbidNonWhitelisted: true },
      });

      const entity = new Band();
      Object.assign(entity, { custom: 'unknown property' });

      try {
        await bandRepository.create(entity);
      } catch (error) {
        expect(error[0].constraints.whitelistValidation).toEqual(
          'property custom should not exist'
        );
      }
    });

    it('must fail validation if an invalid class is given', async () => {
      initialize(firestore, { validateModels: true });

      const entity = new Band();

      entity.contactEmail = 'Not an email';

      try {
        await bandRepository.create(entity);
      } catch (error) {
        expect(error[0].constraints.isEmail).toEqual('Invalid email!');
      }
    });

    it('must fail validation if an invalid object is given', async () => {
      initialize(firestore, { validateModels: true });

      const entity: Partial<Band> = {
        contactEmail: 'Not an email',
        id: '1234',
      };

      try {
        await bandRepository.create(entity as Band);
      } catch (error) {
        expect(error[0].constraints.isEmail).toEqual('Invalid email!');
      }
    });

    it('must create items when id is passed', async () => {
      const entity = new Band();
      entity.id = 'perfect-circle';
      entity.name = 'A Perfect Circle';
      entity.formationYear = 1999;
      entity.genres = ['alternative-rock', 'alternative-metal', 'hard-rock'];

      const band = await bandRepository.create(entity);
      expect(band.id).toEqual(entity.id);
      expect(band.name).toEqual(entity.name);
      expect(band.formationYear).toEqual(entity.formationYear);
      expect(band.genres).toEqual(entity.genres);
    });

    it('must create items and assign a custom id if no id is passed', async () => {
      const entity = new Band();
      entity.name = 'The Pinapple Thief';
      entity.formationYear = 1999;
      entity.genres = ['progressive-rock'];

      const band = await bandRepository.create(entity);
      expect(typeof band.id).toEqual('string');
      expect(band.id).not.toBeUndefined();
      expect(band.name).toEqual(entity.name);
      expect(band.formationYear).toEqual(entity.formationYear);
      expect(band.genres).toEqual(entity.genres);
    });

    it('must save autogenerated id field in document if no id is passed', async () => {
      const entity = new Band();
      entity.name = 'Deftones';
      entity.formationYear = 1988;
      entity.genres = ['alternative-metal'];

      const band = await bandRepository.create(entity);
      const foundBand = await bandRepository.findById(band.id);

      expect(band.id).toEqual(foundBand.id);
    });

    it('throw error when trying to create objects with duplicated id', async () => {
      expect.assertions(1);
      const entity = new Band();
      entity.id = 'pink-floyd';

      await expect(bandRepository.create(entity)).rejects.toThrowError(
        'A document with id pink-floyd already exists.'
      );
    });
  });

  describe('update', () => {
    it('must update and return updated item', async () => {
      const band = await bandRepository.findById('porcupine-tree');
      const albums = band.albums;
      band.name = 'Steven Wilson';
      const updatedBand = await bandRepository.update(band);
      expect(band.name).toEqual(updatedBand.name);

      // should not mutate other fields or relations on updated item
      expect(band.albums).toEqual(albums);
    });

    it('must not validate if the validate config property is false', async () => {
      initialize(firestore, { validateModels: false });

      bandRepository = new BandRepository('bands');

      const band = await bandRepository.findById('porcupine-tree');
      band.contactEmail = 'Not an email';

      await bandRepository.update(band);
      const updatedBand = await bandRepository.findById('porcupine-tree');

      expect(updatedBand.contactEmail).toEqual('Not an email');
    });

    it('must fail validation if an invalid class is given', async () => {
      initialize(firestore, { validateModels: true });

      const band = await bandRepository.findById('porcupine-tree');

      band.contactEmail = 'Not an email';

      try {
        await bandRepository.update(band);
      } catch (error) {
        expect(error[0].constraints.isEmail).toEqual('Invalid email!');
      }
    });

    it('must fail validation if an invalid object is given', async () => {
      initialize(firestore, { validateModels: true });

      const band = await bandRepository.findById('porcupine-tree');
      band.contactEmail = 'Not an Email';

      try {
        await bandRepository.update(band);
      } catch (error) {
        expect(error[0].constraints.isEmail).toEqual('Invalid email!');
      }
    });

    it.todo('must only update changed fields');
    it.todo('must throw if item is not found');
  });

  describe('delete', () => {
    it('must delete item', async () => {
      await bandRepository.delete('porcupine-tree');
      const roy = await bandRepository.findById('porcupine-tree');
      expect(roy).toBeNull();
    });

    // mock-cloud-firestore won't throw here
    it.skip('must throw if item is not found', async () => {
      expect(async () => await bandRepository.delete('lol')).toThrow();
    });
  });

  describe('.where*', () => {
    it('whereEqualTo must accept function as first parameter', async () => {
      const list = await bandRepository.whereEqualTo(b => b.name, 'Porcupine Tree').find();
      expect(list.length).toEqual(1);
      expect(list[0].name).toEqual('Porcupine Tree');
    });

    it('must return T[]', async () => {
      const progressiveRockBands = await bandRepository
        .whereArrayContains('genres', 'progressive-rock')
        .find();

      progressiveRockBands.forEach(b => {
        expect(b.getPopularGenre()).toEqual(b.genres[0]);
      });
    });

    it("must return same list if where filter doesn't apply", async () => {
      const list = await bandRepository.whereGreaterOrEqualThan('formationYear', 1983).find();
      expect(list.length).toEqual(2);
    });

    it('must filter with whereEqualTo', async () => {
      const list = await bandRepository.whereEqualTo('name', 'Porcupine Tree').find();
      expect(list.length).toEqual(1);
      expect(list[0].name).toEqual('Porcupine Tree');
    });

    it('must filter with whereNotEqualTo', async () => {
      const list = await bandRepository.whereNotEqualTo('name', 'Porcupine Tree').find();
      expect(list.length).toEqual(2);
      expect(list[0].formationYear).toEqual(1983);
    });

    it('must filter with whereGreaterThan', async () => {
      const list = await bandRepository.whereGreaterThan('formationYear', 1983).find();
      expect(list.length).toEqual(1);
    });

    it('must filter with whereGreaterOrEqualThan', async () => {
      const list = await bandRepository.whereGreaterOrEqualThan('formationYear', 1983).find();
      expect(list.length).toEqual(2);
    });

    it('must filter with whereLessThan', async () => {
      const list = await bandRepository.whereLessThan('formationYear', 1983).find();

      expect(list.length).toEqual(2);
    });

    it('must filter with whereLessOrEqualThan', async () => {
      const list = await bandRepository.whereLessOrEqualThan('formationYear', 1983).find();
      expect(list.length).toEqual(3);
    });

    it('must filter with whereArrayContains', async () => {
      const list = await bandRepository.whereArrayContains('genres', 'progressive-rock').find();
      expect(list.length).toEqual(2);
    });

    it('must filter with whereArrayContainsAny', async () => {
      const list = await bandRepository
        .whereArrayContainsAny('genres', ['psychedelic-rock', 'funk-rock'])
        .find();
      expect(list.length).toEqual(3);
    });

    it('must filter with whereIn', async () => {
      const list = await bandRepository.whereIn('formationYear', [1965, 1983, 1987]).find();
      expect(list.length).toEqual(3);
    });

    it('must filter with whereNotIn', async () => {
      const list = await bandRepository.whereNotIn('formationYear', [1965]).find();
      expect(list.length).toEqual(2);
    });

    it('must filter with customQuery', async () => {
      const list = await bandRepository
        .customQuery(async (_, col) => {
          return col.where('id', '==', 'porcupine-tree');
        })
        .find();
      expect(list[0].name).toEqual('Porcupine Tree');
    });

    it('must mutate query with customQuery', async () => {
      const list = await bandRepository
        .whereGreaterOrEqualThan(b => b.formationYear, 1983)
        .orderByAscending(p => p.name) // to make it deterministic
        .customQuery(async q => {
          return q.limit(1);
        })
        .find();

      expect(list[0].name).toEqual('Porcupine Tree');
    });

    it('should throw with whereArrayContainsAny and more than 10 items in val array', async () => {
      expect(async () => {
        await bandRepository
          .whereArrayContainsAny('genres', [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11])
          .find();
      }).rejects.toThrow(Error);
    });

    it('should throw with whereIn and more than 10 items in val array', async () => {
      expect(async () => {
        await bandRepository.whereIn('formationYear', [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]).find();
      }).rejects.toThrow(Error);
    });

    it('should throw with whereNotIn and more than 10 items in val array', async () => {
      expect(async () => {
        await bandRepository
          .whereNotIn('formationYear', [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11])
          .find();
      }).rejects.toThrow(Error);
    });

    it('must filter with two or more operators', async () => {
      const list = await bandRepository
        .whereLessOrEqualThan('formationYear', 1983)
        .whereArrayContains('genres', 'funk-rock')
        .find();
      expect(list.length).toEqual(1);
      expect(list[0].id).toEqual('red-hot-chili-peppers');
    });

    it('must support document references in where methods', async () => {
      const docRef = firestore.collection('bands').doc('steven-wilson');

      const band = await bandRepository.findById('porcupine-tree');
      band.relatedBand = docRef;
      await bandRepository.update(band);

      const byReference = await bandRepository.whereEqualTo(b => b.relatedBand, docRef).find();

      expect(byReference.length).toEqual(1);
      expect(byReference[0].name).toEqual('Porcupine Tree');
    });
  });

  describe('findOne', () => {
    it('must return T', async () => {
      const result = await bandRepository
        .whereLessOrEqualThan('formationYear', 1983)
        .whereArrayContains('genres', 'funk-rock')
        .findOne();
      expect(result).toBeInstanceOf(Band);
      expect(result.id).toEqual('red-hot-chili-peppers');
    });

    it('must return null if not found', async () => {
      const result = await bandRepository.whereLessThan('formationYear', 0).findOne();
      expect(result).toBeNull();
    });

    it('should work within transactions', async () => {
      await bandRepository.runTransaction(async tran => {
        const result = await tran.whereLessThan('formationYear', 0).findOne();
        expect(result).toBeNull();
      });
    });
  });

  describe('miscellaneous', () => {
    it('should correctly parse dates', async () => {
      const pt = await bandRepository.findById('porcupine-tree');
      const { releaseDate } = await pt.albums.findById('deadwing');
      expect(pt.lastShow).toBeInstanceOf(Date);
      expect(pt.lastShow.toISOString()).toEqual('2010-10-14T00:00:00.000Z');
      expect(releaseDate).toBeInstanceOf(Date);
      expect(releaseDate.toISOString()).toEqual('2005-03-25T00:00:00.000Z');
    });

    it('should correctly parse geopoints', async () => {
      const pt = await bandRepository.findById('porcupine-tree');
      expect(pt.lastShowCoordinates).toBeInstanceOf(Coordinates);
      expect(pt.lastShowCoordinates.latitude).toEqual(51.5009088);
      expect(pt.lastShowCoordinates.longitude).toEqual(-0.1795547);
    });

    it('should correctly parse references', async () => {
      const docRef = firestore.collection('bands').doc('opeth');

      const band = await bandRepository.findById('porcupine-tree');
      band.relatedBand = docRef;
      await bandRepository.update(band);

      const foundBand = await bandRepository.findById('porcupine-tree');

      expect(foundBand.relatedBand).toBeInstanceOf(FirestoreDocumentReference);
      expect(foundBand.relatedBand.id).toEqual('opeth');
      // firestore mock doesn't set this property, it should be bands/opeth
      expect(foundBand.relatedBand.path).toEqual(undefined);
    });

    it('should correctly filter by null values', async () => {
      const entity = new Band();
      entity.id = 'rush';
      entity.name = 'Rush';
      entity.formationYear = null;
      entity.genres = ['progressive-rock', 'hard-rock', 'heavy-metal'];

      await bandRepository.create(entity);

      const bandsWithNullFormationYear = await bandRepository
        .whereEqualTo(a => a.formationYear, null)
        .findOne();

      expect(bandsWithNullFormationYear.id).toEqual(entity.id);
    });
  });

  describe('transactions', () => {
    it('should be able to open transactions', async () => {
      await bandRepository.runTransaction(async tran => {
        const band = await tran.findById('porcupine-tree');
        band.name = 'Árbol de Puercoespín';
        await tran.update(band);
      });

      const updated = await bandRepository.findById('porcupine-tree');
      expect(updated.name).toEqual('Árbol de Puercoespín');
    });

    it('runTransaction should return TransactionRepository', async () => {
      await bandRepository.runTransaction(async tran => {
        expect(tran.constructor.name).toEqual('TransactionRepository');
      });
    });
  });

  describe('batch', () => {
    it('should be able to create batches from repository', async () => {
      const batch = bandRepository.createBatch();

      const entity1 = new Band();
      entity1.id = 'entity1';
      entity1.name = 'Entity1';
      entity1.formationYear = 2099;

      const entity2 = new Band();
      entity2.id = 'entity2';
      entity2.name = 'Entity2';
      entity2.formationYear = 2099;

      const entity3 = new Band();
      entity3.id = 'entity3';
      entity3.name = 'Entity3';
      entity3.formationYear = 2099;

      batch.create(entity1);
      batch.create(entity2);
      batch.create(entity3);

      await batch.commit();

      const batchedBands = await bandRepository.whereEqualTo('formationYear', 2099).find();
      expect(batchedBands.map(b => b.name)).toEqual(['Entity1', 'Entity2', 'Entity3']);
    });
  });

  describe('must handle subcollections', () => {
    it('should initialize nested subcollections', async () => {
      const pt = await bandRepository.findById('red-hot-chili-peppers');
      expect(pt.name).toEqual('Red Hot Chili Peppers');
      expect(pt.albums).toBeInstanceOf(BaseFirestoreRepository);

      const album = await pt.albums.findById('stadium-arcadium');
      expect(album.name).toEqual('Stadium Arcadium');
      expect(album.images).toBeInstanceOf(BaseFirestoreRepository);
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
      expect(albums.length).toEqual(3);
    });

    it('should initialize nested subcollections on create', async () => {
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

      const album = await band.albums.create(firstAlbum);

      expect(album.images).toBeInstanceOf(BaseFirestoreRepository);
    });

    it('should be able to validate subcollections on create', async () => {
      initialize(firestore, { validateModels: true });

      const band = new Band();
      band.id = '30-seconds-to-mars';
      band.name = '30 Seconds To Mars';
      band.formationYear = 1998;
      band.genres = ['alternative-rock'];

      await bandRepository.create(band);

      const firstAlbum = new Album();
      firstAlbum.id = 'invalid-album-name';
      firstAlbum.name = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';
      firstAlbum.releaseDate = new Date('2002-07-22');

      try {
        await band.albums.create(firstAlbum);
      } catch (error) {
        expect(error[0].constraints.isLength).toEqual('Name is too long');
      }
    });

    it('should be able to update subcollections', async () => {
      const pt = await bandRepository.findById('porcupine-tree');
      const album = await pt.albums.findById('fear-blank-planet');
      album.comment = 'Anesthethize is top 3 IMHO';

      await pt.albums.update(album);

      const updatedAlbum = await pt.albums.findById('fear-blank-planet');
      expect(updatedAlbum.comment).toEqual('Anesthethize is top 3 IMHO');
    });

    it('should be able to validate subcollections on update', async () => {
      initialize(firestore, { validateModels: true });

      const pt = await bandRepository.findById('porcupine-tree');
      const album = await pt.albums.findById('fear-blank-planet');

      album.name = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';

      try {
        await pt.albums.update(album);
      } catch (error) {
        expect(error[0].constraints.isLength).toEqual('Name is too long');
      }
    });

    it('should be able to update collections with subcollections', async () => {
      const pt = await bandRepository.findById('porcupine-tree');
      pt.name = 'Porcupine Tree IS THE BEST';
      const updatedPt = await bandRepository.update(pt);
      const foundUpdatedPt = await bandRepository.update(pt);

      expect(updatedPt.name).toEqual(pt.name);
      expect(foundUpdatedPt.name).toEqual(pt.name);
    });

    it('should be able to delete subcollections', async () => {
      const pt = await bandRepository.findById('porcupine-tree');
      await pt.albums.delete('fear-blank-planet');

      const updatedBandAlbums = await pt.albums.find();
      expect(updatedBandAlbums.length).toEqual(3);
    });

    it('should be able to update subcollections of subcollections', async () => {
      const band = new Band();
      band.id = '30-seconds-to-mars';
      band.name = '30 Seconds To Mars';
      band.formationYear = 1998;
      band.genres = ['alternative-rock'];

      await bandRepository.create(band);

      const firstAlbum = new Album();
      firstAlbum.id = '30-seconds-to-mars';
      firstAlbum.name = '30 Seconds to Mars (Album)';
      firstAlbum.releaseDate = new Date('2002-07-22');

      const album = await band.albums.create(firstAlbum);

      const image1 = new AlbumImage();
      image1.id = 'image1';
      image1.url = 'http://image1.com';

      const image2 = new AlbumImage();
      image2.id = 'image2';
      image2.url = 'http://image2.com';

      await album.images.create(image1);
      await album.images.create(image2);

      const images = await album.images.find();
      expect(images.length).toEqual(2);

      const foundBand = await bandRepository.findById('30-seconds-to-mars');
      expect(foundBand.name).toEqual('30 Seconds To Mars');

      const foundAlbums = await foundBand.albums.find();

      expect(foundAlbums.length).toEqual(1);
      expect(foundAlbums[0].name).toEqual('30 Seconds to Mars (Album)');

      const foundImages = await foundAlbums[0].images.find();
      expect(foundImages.length).toEqual(2);
      expect(foundImages[0].id).toEqual('image1');
    });
  });

  describe('fetching documents created w/o id inside object', () => {
    let docId: string = null;

    beforeEach(async () => {
      const bandWithoutId = new Band();
      docId = (await firestore.collection('bands').add(bandWithoutId)).id;
    });

    it('Get by id - entity should contain id', async () => {
      const band = await bandRepository.findById(docId);
      expect(band).toHaveProperty('id');
      expect(band.id).toEqual(docId);
    });

    it('Get list - all entities should contain id', async () => {
      const bands = await bandRepository.find();
      for (const b of bands) {
        expect(b.id).not.toBeUndefined();
      }

      const possibleDocWithoutId = bands.find(band => band.id === docId);
      expect(possibleDocWithoutId).not.toBeUndefined();
    });
  });

  describe('deserialization', () => {
    it('should correctly initialize a repository with an entity', async () => {
      const bandRepositoryWithPath = new BandRepository(Band);
      const band = await bandRepositoryWithPath.findById('the-speckled-band');
      expect(band.name).toEqual('the Speckled Band');
      expect(band.agents[0]).toBeInstanceOf(Agent);
      expect(band.agents[0].name).toEqual('Mycroft Holmes');
      expect(band.agents[0].website).toBeInstanceOf(Website);
      expect(band.agents[0].website.url).toEqual('en.wikipedia.org/wiki/Mycroft_Holmes');
    });
  });
});
