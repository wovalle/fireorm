import { Firestore } from '@google-cloud/firestore';
import { BaseFirestoreRepository } from '../BaseFirestoreRepository';
import { getFixture, Album } from '../../test/fixture';
import { initialize } from '../MetadataStorage';
import { Band } from '../../test/BandCollection';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const MockFirebase = require('mock-cloud-firestore');

// Just a test type to prevent using any other method than
// runTransaction in this file
type TestTransactionRepository<T extends { id: string }> = Pick<
  BaseFirestoreRepository<T>,
  'runTransaction'
>;

class BandRepository extends BaseFirestoreRepository<Band> {}

describe('BaseFirestoreTransactionRepository', () => {
  let bandRepository: TestTransactionRepository<Band>;
  let firestore: Firestore;

  beforeEach(() => {
    const fixture = Object.assign({}, getFixture());
    const firebase = new MockFirebase(fixture);

    firestore = firebase.firestore();
    initialize(firestore);

    bandRepository = new BandRepository('bands');
  });

  describe('limit', () => {
    it('must throw when using limit', async () => {
      await bandRepository.runTransaction(async tran => {
        expect(() => tran.limit()).toThrow();
      });
    });
  });

  describe('orderBy*', () => {
    it('must throw when using orderByAscending', async () => {
      await bandRepository.runTransaction(async tran => {
        expect(() => tran.orderByAscending()).toThrow();
      });
    });

    it('must throw when using orderByDescending', async () => {
      await bandRepository.runTransaction(async tran => {
        expect(() => tran.orderByDescending()).toThrow();
      });
    });
  });

  describe('findById', () => {
    it('must find by id', async () => {
      await bandRepository.runTransaction(async tran => {
        const pt = await tran.findById('porcupine-tree');
        expect(pt).toBeInstanceOf(Band);
        expect(pt.id).toEqual('porcupine-tree');
        expect(pt.name).toEqual('Porcupine Tree');
      });
    });

    it('must have proper getters', async () => {
      await bandRepository.runTransaction(async tran => {
        const pt = await tran.findById('porcupine-tree');
        expect(pt.getLastShowYear()).toEqual(2010);
      });
    });

    it('return null if not found', async () => {
      await bandRepository.runTransaction(async tran => {
        const sw = await tran.findById('steven-wilson');
        expect(sw).toBeNull();
      });
    });
  });

  describe('create', () => {
    it('should return T when an item is created', async () => {
      const entity = new Band();
      entity.id = 'rush';
      entity.name = 'Rush';
      entity.formationYear = 1968;
      entity.genres = ['progressive-rock', 'hard-rock', 'heavy-metal'];

      await bandRepository.runTransaction(async tran => {
        const band = await tran.create(entity);
        expect(band).toBeInstanceOf(Band);
        expect(band.getPopularGenre()).toEqual('progressive-rock');
      });
    });

    it('must not validate if the validate config property is false', async () => {
      initialize(firestore, { validateModels: false });

      await bandRepository.runTransaction(async tran => {
        const entity = new Band();
        entity.contactEmail = 'Not an email';
        const band = await tran.create(entity);
        expect(band.contactEmail).toEqual('Not an email');
      });
    });

    it('must fail validation if an invalid class is given', async () => {
      await bandRepository.runTransaction(async tran => {
        const entity = new Band();

        entity.contactEmail = 'Not an email';

        try {
          await tran.create(entity);
        } catch (error) {
          expect(error[0].constraints.isEmail).toEqual('Invalid email!');
        }
      });
    });

    it('must fail validation if an invalid object is given', async () => {
      await bandRepository.runTransaction(async tran => {
        const entity: Partial<Band> = {
          contactEmail: 'Not an email',
        };

        try {
          await tran.create(entity as Band);
        } catch (error) {
          expect(error[0].constraints.isEmail).toEqual('Invalid email!');
        }
      });
    });

    it('must create items when id is passed', async () => {
      const entity = new Band();
      entity.id = 'perfect-circle';
      entity.name = 'A Perfect Circle';
      entity.formationYear = 1999;
      entity.genres = ['alternative-rock', 'alternative-metal', 'hard-rock'];

      await bandRepository.runTransaction(async tran => {
        const band = await tran.create(entity);
        expect(band.id).toEqual(entity.id);
        expect(band.name).toEqual(entity.name);
        expect(band.formationYear).toEqual(entity.formationYear);
        expect(band.genres).toEqual(entity.genres);
      });
    });

    it('must create items and assign a custom id if no id is passed', async () => {
      const entity = new Band();
      entity.name = 'The Pinapple Thief';
      entity.formationYear = 1999;
      entity.genres = ['progressive-rock'];

      await bandRepository.runTransaction(async tran => {
        const band = await tran.create(entity);
        expect(typeof band.id).toEqual('string');
        expect(band.id).not.toBeUndefined();
        expect(band.name).toEqual(entity.name);
        expect(band.formationYear).toEqual(entity.formationYear);
        expect(band.genres).toEqual(entity.genres);
      });
    });

    it('must save autogenerated id field in document if no id is passed', async () => {
      const entity = new Band();
      entity.name = 'Deftones';
      entity.formationYear = 1988;
      entity.genres = ['alternative-metal'];

      await bandRepository.runTransaction(async tran => {
        const band = await tran.create(entity);
        const foundBand = await tran.findById(band.id);
        expect(band.id).toEqual(foundBand.id);
      });
    });

    it.todo('must be able to create document from anonymous object without id');
  });

  describe('update', () => {
    it('must update and return updated item', async () => {
      await bandRepository.runTransaction(async tran => {
        const band = await tran.findById('porcupine-tree');
        band.name = 'Steven Wilson';
        const updatedBand = await tran.update(band);
        expect(band.name).toEqual(updatedBand.name);
      });
    });

    it('must update and store updated item', async () => {
      await bandRepository.runTransaction(async tran => {
        const band = await tran.findById('porcupine-tree');
        band.name = 'Steven Wilson';
        await tran.update(band);
        const updatedBand = await tran.findById('porcupine-tree');
        expect(band.name).toEqual(updatedBand.name);
      });
    });

    it('must not validate if the validate config property is false', async () => {
      initialize(firestore, { validateModels: false });

      await bandRepository.runTransaction(async tran => {
        const band = await tran.findById('porcupine-tree');
        band.contactEmail = 'Not an email';
        await tran.update(band);
        const updatedBand = await tran.findById('porcupine-tree');
        expect(updatedBand.contactEmail).toEqual('Not an email');
      });
    });

    it('must fail validation if an invalid class is given', async () => {
      await bandRepository.runTransaction(async tran => {
        const band = await tran.findById('porcupine-tree');

        band.contactEmail = 'Not an email';

        try {
          await tran.update(band);
        } catch (error) {
          expect(error[0].constraints.isEmail).toEqual('Invalid email!');
        }
      });
    });

    it('must fail validation if an invalid object is given', async () => {
      await bandRepository.runTransaction(async tran => {
        const band = await tran.findById('porcupine-tree');
        const updatedBand: Partial<Band> = {
          ...band,
          contactEmail: 'Not an email',
        };

        try {
          await tran.update(updatedBand as Band);
        } catch (error) {
          expect(error[0].constraints.isEmail).toEqual('Invalid email!');
        }
      });
    });

    it.todo('must throw if item is not found');
  });

  describe('delete', () => {
    it('must delete item', async () => {
      await bandRepository.runTransaction(async tran => {
        await tran.delete('porcupine-tree');
        const pt = await tran.findById('porcupine-tree');
        expect(pt).toBeNull();
      });
    });

    // mock-cloud-firestore won't throw here
    it.skip('must throw if item is not found', async () => {
      await bandRepository.runTransaction(async tran => {
        expect(() => tran.delete('lolita')).toThrow();
      });
    });
  });

  describe('.where*', () => {
    it('whereEqualTo must accept function as first parameter', async () => {
      await bandRepository.runTransaction(async tran => {
        const list = await tran.whereEqualTo(b => b.name, 'Porcupine Tree').find();
        expect(list.length).toEqual(1);
        expect(list[0].name).toEqual('Porcupine Tree');
      });
    });

    it('must return T[]', async () => {
      await bandRepository.runTransaction(async tran => {
        const progressiveRockBands = await tran
          .whereArrayContains('genres', 'progressive-rock')
          .find();

        progressiveRockBands.forEach(b => {
          expect(b.getPopularGenre()).toEqual(b.genres[0]);
        });
      });
    });

    it('must return same list if where filter does not apply', async () => {
      await bandRepository.runTransaction(async tran => {
        const list = await tran.whereGreaterOrEqualThan('formationYear', 1983).find();
        expect(list.length).toEqual(2);
      });
    });

    it('must filter with whereEqualTo', async () => {
      await bandRepository.runTransaction(async tran => {
        const list = await tran.whereEqualTo('name', 'Porcupine Tree').find();
        expect(list.length).toEqual(1);
        expect(list[0].name).toEqual('Porcupine Tree');
      });
    });

    it('must filter with whereGreaterThan', async () => {
      await bandRepository.runTransaction(async tran => {
        const list = await tran.whereGreaterThan('formationYear', 1983).find();
        expect(list.length).toEqual(1);
      });
    });

    it('must filter with whereGreaterOrEqualThan', async () => {
      await bandRepository.runTransaction(async tran => {
        const list = await tran.whereGreaterOrEqualThan('formationYear', 1983).find();
        expect(list.length).toEqual(2);
      });
    });

    it('must filter with whereLessThan', async () => {
      await bandRepository.runTransaction(async tran => {
        const list = await tran.whereLessThan('formationYear', 1983).find();

        expect(list.length).toEqual(1);
      });
    });

    it('must filter with whereLessOrEqualThan', async () => {
      await bandRepository.runTransaction(async tran => {
        const list = await tran.whereLessOrEqualThan('formationYear', 1983).find();
        expect(list.length).toEqual(2);
      });
    });

    it('must filter with whereArrayContains', async () => {
      await bandRepository.runTransaction(async tran => {
        const list = await tran.whereArrayContains('genres', 'progressive-rock').find();
        expect(list.length).toEqual(2);
      });
    });

    it('must filter with two or more operators', async () => {
      await bandRepository.runTransaction(async tran => {
        const list = await tran
          .whereLessOrEqualThan('formationYear', 1983)
          .whereArrayContains('genres', 'funk-rock')
          .find();
        expect(list.length).toEqual(1);
        expect(list[0].id).toEqual('red-hot-chili-peppers');
      });
    });
  });

  describe('miscellaneous', () => {
    it('should correctly parse dates', async () => {
      await bandRepository.runTransaction(async tran => {
        const pt = await tran.findById('porcupine-tree');
        expect(pt.lastShow).toBeInstanceOf(Date);
        expect(pt.lastShow.toISOString()).toEqual('2010-10-14T00:00:00.000Z');
      });
    });
  });

  describe('must handle subcollections', () => {
    it('should initialize subcollections', async () => {
      await bandRepository.runTransaction(async tran => {
        const pt = await tran.findById('porcupine-tree');
        expect(pt.name).toEqual('Porcupine Tree');
        expect(pt.albums).toBeInstanceOf(BaseFirestoreRepository);
      });
    });

    it('should initialize nested subcollections', async () => {
      await bandRepository.runTransaction(async tran => {
        const pt = await tran.findById('red-hot-chili-peppers');
        const albumsRef = pt.albums;
        if (!albumsRef) {
          throw new Error('Albums should not have an undefined value');
        }

        const album = await albumsRef.findById('stadium-arcadium');
        if (album === null) {
          throw new Error('Album should not have a null value');
        }

        expect(album.images).toBeInstanceOf(BaseFirestoreRepository);
      });
    });

    it('should be able to execute operations in the subcollection', async () => {
      await bandRepository.runTransaction(async tran => {
        const band = await tran.findById('red-hot-chili-peppers');
        const albumsRef = band.albums;
        if (!albumsRef) {
          throw new Error('Albums should not have an undefined value');
        }

        const bestAlbum = await albumsRef.findById('stadium-arcadium');
        if (bestAlbum === null) {
          throw new Error('Album should not have a null value');
        }

        expect(bestAlbum.id).toEqual('stadium-arcadium');
      });
    });

    it('should be able to create subcollections', async () => {
      const band = new Band();
      band.id = '30-seconds-to-mars';
      band.name = '30 Seconds To Mars';
      band.formationYear = 1998;
      band.genres = ['alternative-rock'];

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

      await bandRepository.runTransaction(async tran => {
        await tran.create(band);
        const albumsRef = band.albums;
        if (!albumsRef) {
          throw new Error('Albums should not have an undefined value');
        }

        await albumsRef.create(firstAlbum);
        await albumsRef.create(secondAlbum);
        await albumsRef.create(thirdAlbum);

        const albums = await albumsRef.find();
        expect(albums.length).toEqual(3);
      });
    });

    it('should initialize nested subcollections on create', async () => {
      const band = new Band();
      band.id = '30-seconds-to-mars';
      band.name = '30 Seconds To Mars';
      band.formationYear = 1998;
      band.genres = ['alternative-rock'];

      const firstAlbum = new Album();
      firstAlbum.id = '30-seconds-to-mars';
      firstAlbum.name = '30 Seconds to Mars';
      firstAlbum.releaseDate = new Date('2002-07-22');

      await bandRepository.runTransaction(async tran => {
        await tran.create(band);
        const albumsRef = band.albums;
        if (!albumsRef) {
          throw new Error('Albums should not have an undefined value');
        }
        const album = await albumsRef.create(firstAlbum);

        expect(album.images).toBeInstanceOf(BaseFirestoreRepository);
      });
    });

    it('should be able to validate subcollections on create', async () => {
      const band = new Band();
      band.id = '30-seconds-to-mars';
      band.name = '30 Seconds To Mars';
      band.formationYear = 1998;
      band.genres = ['alternative-rock'];

      const firstAlbum = new Album();
      firstAlbum.id = 'invalid-album-name';
      firstAlbum.name = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';
      firstAlbum.releaseDate = new Date('2002-07-22');

      await bandRepository.runTransaction(async tran => {
        await tran.create(band);
        const albumsRef = band.albums;
        if (!albumsRef) {
          throw new Error('Albums should not have an undefined value');
        }

        try {
          await albumsRef.create(firstAlbum);
        } catch (error) {
          expect(error[0].constraints.length).toEqual('Name is too long');
        }
      });
    });

    it('should be able to update subcollections', async () => {
      await bandRepository.runTransaction(async tran => {
        const pt = await tran.findById('porcupine-tree');
        const albumsRef = pt.albums;
        if (!albumsRef) {
          throw new Error('Albums should not have an undefined value');
        }

        const album = await albumsRef.findById('fear-blank-planet');
        if (album === null) {
          throw new Error('Album should not have a null value');
        }
        album.comment = 'Anesthethize is top 3 IMHO';

        await albumsRef.update(album);

        const updatedAlbum = await albumsRef.findById('fear-blank-planet');
        if (updatedAlbum === null) {
          throw new Error('Updated album should not have a null value');
        }

        expect(updatedAlbum.comment).toEqual('Anesthethize is top 3 IMHO');
      });
    });

    it('should be able to validate subcollections on update', async () => {
      await bandRepository.runTransaction(async tran => {
        const pt = await tran.findById('porcupine-tree');
        const albumsRef = pt.albums;
        if (!albumsRef) {
          throw new Error('Albums should not have an undefined value');
        }

        const album = await albumsRef.findById('fear-blank-planet');
        if (album === null) {
          throw new Error('Album should not have a null value');
        }
        album.name = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';

        try {
          await albumsRef.update(album);
        } catch (error) {
          expect(error[0].constraints.length).toEqual('Name is too long');
        }
      });
    });

    it('should be able to update collections with subcollections', async () => {
      await bandRepository.runTransaction(async tran => {
        const pt = await tran.findById('porcupine-tree');
        pt.name = 'Porcupine Tree IS THE BEST';
        const updatedPt = await tran.update(pt);
        const foundUpdatedPt = await tran.update(pt);

        expect(updatedPt.name).toEqual(pt.name);
        expect(foundUpdatedPt.name).toEqual(pt.name);
      });
    });

    it('should be able to delete subcollections', async () => {
      await bandRepository.runTransaction(async tran => {
        const pt = await tran.findById('porcupine-tree');
        const albumsRef = pt.albums;
        if (!albumsRef) {
          throw new Error('Albums should not have an undefined value');
        }
        await albumsRef.delete('fear-blank-planet');

        const updatedBandAlbums = await albumsRef.find();
        expect(updatedBandAlbums.length).toEqual(3);
      });
    });

    describe('miscellaneous', () => {
      it('should correctly parse dates', async () => {
        await bandRepository.runTransaction(async tran => {
          const pt = await tran.findById('porcupine-tree');
          const albumsRef = pt.albums;
          if (!albumsRef) {
            throw new Error('Albums should not have an undefined value');
          }

          const album = await albumsRef.findById('fear-blank-planet');
          if (album === null) {
            throw new Error('Album should not have a null value');
          }
          const { releaseDate } = album;

          expect(releaseDate).toBeInstanceOf(Date);
          expect(releaseDate.toISOString()).toEqual('2007-04-16T00:00:00.000Z');
        });
      });
    });
  });
});
