import { BaseFirestoreBatchRepository } from './BaseFirestoreBatchRepository';
import { getFixture } from '../../test/fixture';
import { initialize } from '../MetadataUtils';
import { Band, Album } from '../../test/BandCollection';
import { Firestore, WriteBatch } from '@google-cloud/firestore';
import { FirestoreBatchUnit } from './FirestoreBatchUnit';
import { BaseFirestoreRepository } from '../BaseFirestoreRepository';
import { getRepository } from '../helpers';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const MockFirebase = require('mock-cloud-firestore');

describe('BaseFirestoreBatchRepository', () => {
  let bandBatchRepository: BaseFirestoreBatchRepository<Band> = null;
  let bandRepository: BaseFirestoreRepository<Band> = null;
  let firestore: Firestore;
  let batch: FirestoreBatchUnit;
  let batchStub: jest.Mocked<WriteBatch>;

  beforeEach(() => {
    const fixture = Object.assign({}, getFixture());
    const firebase = new MockFirebase(fixture, {
      isNaiveSnapshotListenerEnabled: false,
    });

    batchStub = {
      create: jest.fn(),
      update: jest.fn(),
      set: jest.fn(),
      delete: jest.fn(),
      commit: jest.fn(),
    };

    firestore = Object.assign(firebase.firestore(), { batch: () => batchStub });
    initialize(firestore);

    batch = new FirestoreBatchUnit(firestore);
    bandBatchRepository = new BaseFirestoreBatchRepository(Band, batch);
    bandRepository = getRepository(Band);
  });

  describe('create', () => {
    it('must create items when id is passed', async () => {
      const entity = new Band();
      entity.id = 'perfect-circle';
      entity.name = 'A Perfect Circle';
      entity.formationYear = 1999;
      entity.genres = ['alternative-rock', 'alternative-metal', 'hard-rock'];

      bandBatchRepository.create(entity);
      await batch.commit();

      expect(batchStub.set.mock.calls[0][1]).toEqual({
        id: 'perfect-circle',
        name: 'A Perfect Circle',
        formationYear: 1999,
        genres: ['alternative-rock', 'alternative-metal', 'hard-rock'],
      });
    });

    it('must create items and assign a custom id if no id is passed', async () => {
      const entity = new Band();
      entity.name = 'The Pinapple Thief';
      entity.formationYear = 1999;
      entity.genres = ['progressive-rock'];

      bandBatchRepository.create(entity);
      await batch.commit();

      const data = batchStub.set.mock.calls[0][1] as Band;

      expect(typeof data.id).toEqual('string');
      expect(data.name).toEqual('The Pinapple Thief');
      expect(data.formationYear).toEqual(1999);
      expect(data.genres).toEqual(['progressive-rock']);
    });

    it.todo('must be able to create document from anonymous object without id');
  });

  describe('update', () => {
    it('must call batch.update', async () => {
      const entity = new Band();
      entity.id = 'perfect-circle';
      entity.name = 'A Perfect Circle';
      entity.formationYear = 1999;
      entity.genres = ['alternative-rock', 'alternative-metal', 'hard-rock'];

      bandBatchRepository.create(entity);
      await batch.commit();

      entity.name = 'Un Círculo Perfecto';
      bandBatchRepository.update(entity);
      await batch.commit();

      expect(batchStub.update.mock.calls[0][1]).toEqual({
        id: 'perfect-circle',
        name: 'Un Círculo Perfecto',
        formationYear: 1999,
        genres: ['alternative-rock', 'alternative-metal', 'hard-rock'],
      });
    });
  });

  describe('delete', () => {
    it('must call batch.delete', async () => {
      const entity = new Band();
      entity.id = 'perfect-circle';
      entity.name = 'A Perfect Circle';
      entity.formationYear = 1999;
      entity.genres = ['alternative-rock', 'alternative-metal', 'hard-rock'];

      bandBatchRepository.delete(entity);
      await batch.commit();

      expect(batchStub.delete.mock.calls[0][1]).toEqual({
        id: 'perfect-circle',
        name: 'A Perfect Circle',
        formationYear: 1999,
        genres: ['alternative-rock', 'alternative-metal', 'hard-rock'],
      });
    });
  });

  describe('should run validations', () => {
    it('should run validations', async () => {
      initialize(firestore, { validateModels: true });

      const validationBatch = new FirestoreBatchUnit(firestore);
      const validationBandRepository = new BaseFirestoreBatchRepository(Band, validationBatch);

      const entity = new Band();
      entity.id = 'perfect-circle';
      entity.name = 'A Perfect Circle';
      entity.formationYear = 1999;
      entity.genres = ['alternative-rock', 'alternative-metal', 'hard-rock'];
      entity.contactEmail = 'Not an email';

      validationBandRepository.create(entity);

      try {
        await validationBatch.commit();
      } catch (error) {
        expect(error[0].constraints.isEmail).toEqual('Invalid email!');
      }
    });

    it('should not run validations on delete', async () => {
      initialize(firestore, { validateModels: true });

      const validationBatch = new FirestoreBatchUnit(firestore);
      const validationBandRepository = new BaseFirestoreBatchRepository(Band, validationBatch);

      const entity = new Band();
      entity.id = 'perfect-circle';
      entity.name = 'A Perfect Circle';
      entity.formationYear = 1999;
      entity.genres = ['alternative-rock', 'alternative-metal', 'hard-rock'];
      entity.contactEmail = 'email@apc.com';

      validationBandRepository.create(entity);
      await validationBatch.commit();

      entity.contactEmail = 'email';
      validationBandRepository.delete(entity);
      expect(validationBatch.commit).not.toThrow();
    });

    it('must not validate forbidden non-whitelisted properties if the validatorOptions: {}', async () => {
      initialize(firestore, { validateModels: true, validatorOptions: {} });

      const validationBatch = new FirestoreBatchUnit(firestore);
      const validationBandRepository = new BaseFirestoreBatchRepository(Band, validationBatch);

      let entity = new Band();
      entity = {
        ...entity,
        unknownProperty: 'unknown property',
      } as unknown as Band;

      validationBandRepository.create(entity);
      expect(validationBatch.commit).not.toThrow();
    });

    it('must validate forbidden non-whitelisted properties if the validatorOptions: {whitelist: true, forbidNonWhitelisted: true}', async () => {
      initialize(firestore, {
        validateModels: true,
        validatorOptions: { whitelist: true, forbidNonWhitelisted: true },
      });

      const validationBatch = new FirestoreBatchUnit(firestore);
      const validationBandRepository = new BaseFirestoreBatchRepository(Band, validationBatch);

      let entity = new Band();
      entity = {
        ...entity,
        unknownProperty: 'unknown property',
      } as unknown as Band;

      validationBandRepository.create(entity);

      try {
        await validationBatch.commit();
      } catch (error) {
        expect(error[0].constraints.whitelistValidation).toEqual(
          'property unknownProperty should not exist'
        );
      }
    });
  });

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  describe('should handle subcollections', () => {
    it('should be able to create subcollections and initialize them', async () => {
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

      // To save in db and initialize subcollections
      await bandRepository.create(band);

      const albumsBatch = band.albums.createBatch();

      albumsBatch.create(firstAlbum);
      albumsBatch.create(secondAlbum);
      albumsBatch.create(thirdAlbum);
      await albumsBatch.commit();

      [firstAlbum, secondAlbum, thirdAlbum].forEach((album, i) => {
        expect(batchStub.set.mock.calls[i][1]).toEqual({
          id: album.id,
          name: album.name,
          releaseDate: album.releaseDate,
        });
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

      // To save in db and initialize subcollections
      await bandRepository.create(band);

      const albumsBatch = band.albums.createBatch();
      albumsBatch.create(firstAlbum);

      try {
        await albumsBatch.commit();
      } catch (error) {
        expect(error[0].constraints.length).toEqual('Name is too long');
      }
    });

    it('should be able to update subcollections', async () => {
      const band = await bandRepository.findById('porcupine-tree');
      const album = await band.albums.findById('fear-blank-planet');
      album.comment = 'Anesthethize is top 3 IMHO';

      const albumsBatch = band.albums.createBatch();
      albumsBatch.update(album);

      await albumsBatch.commit();

      expect(batchStub.update.mock.calls[0][1]).toEqual({
        id: album.id,
        name: album.name,
        releaseDate: album.releaseDate,
        comment: album.comment,
      });
    });

    it('should be able to validate subcollections on update', async () => {
      const pt = await bandRepository.findById('porcupine-tree');
      const album = await pt.albums.findById('fear-blank-planet');

      album.name = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';
      const albumsBatch = pt.albums.createBatch();
      albumsBatch.update(album);

      try {
        await albumsBatch.commit();
      } catch (error) {
        expect(error[0].constraints.length).toEqual('Name is too long');
      }
    });

    it('should be able to delete subcollections', async () => {
      const pt = await bandRepository.findById('porcupine-tree');
      const album = await pt.albums.findById('fear-blank-planet');

      const albumsBatch = pt.albums.createBatch();
      albumsBatch.delete(album);

      await albumsBatch.commit();

      expect(batchStub.delete.mock.calls[0][1]).toEqual({
        id: album.id,
        name: album.name,
        releaseDate: album.releaseDate,
      });
    });
  });
});
