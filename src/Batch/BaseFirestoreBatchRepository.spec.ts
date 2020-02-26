import { expect } from 'chai';
const MockFirebase = require('mock-cloud-firestore');
import { BaseFirestoreBatchRepository } from './BaseFirestoreBatchRepository';
import { getFixture } from '../../test/fixture';
import { initialize } from '../MetadataStorage';
import { Band } from '../../test/BandCollection';
import { Firestore, WriteBatch } from '@google-cloud/firestore';
import sinon from 'sinon';
import { FirestoreBatchUnit } from './FirestoreBatchUnit';

describe('BaseFirestoreBatchRepository', () => {
  let bandRepository: BaseFirestoreBatchRepository<Band> = null;
  let firestore: Firestore;
  let batch: FirestoreBatchUnit;
  let batchStub: sinon.SinonStubbedInstance<WriteBatch>;

  beforeEach(() => {
    const fixture = Object.assign({}, getFixture());
    const firebase = new MockFirebase(fixture, {
      isNaiveSnapshotListenerEnabled: false,
    });

    batchStub = sinon.createStubInstance(WriteBatch);

    firestore = Object.assign(firebase.firestore(), { batch: () => batchStub });
    initialize(firestore);

    batch = new FirestoreBatchUnit(firestore);
    bandRepository = new BaseFirestoreBatchRepository(batch, Band);
  });

  describe('create', () => {
    it('must create items when id is passed', async () => {
      const entity = new Band();
      entity.id = 'perfect-circle';
      entity.name = 'A Perfect Circle';
      entity.formationYear = 1999;
      entity.genres = ['alternative-rock', 'alternative-metal', 'hard-rock'];

      bandRepository.create(entity);
      await batch.commit();

      expect(batchStub.set.firstCall.lastArg).to.eql({
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

      bandRepository.create(entity);
      await batch.commit();

      const data = batchStub.set.firstCall.lastArg;

      expect(typeof data.id).to.eql('string');
      expect(data.name).to.eql('The Pinapple Thief');
      expect(data.formationYear).to.eql(1999);
      expect(data.genres).to.eql(['progressive-rock']);
    });

    it('must be able to create document from anonymous object without id');
  });

  describe('update', () => {
    it('must call batch.update', async () => {
      const entity = new Band();
      entity.id = 'perfect-circle';
      entity.name = 'A Perfect Circle';
      entity.formationYear = 1999;
      entity.genres = ['alternative-rock', 'alternative-metal', 'hard-rock'];

      bandRepository.create(entity);
      await batch.commit();

      entity.name = 'Un Círculo Perfecto';
      bandRepository.update(entity);
      await batch.commit();

      expect(batchStub.update.firstCall.lastArg).to.eql({
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

      bandRepository.delete(entity);
      await batch.commit();

      expect(batchStub.delete.firstCall.lastArg).to.eql({
        id: 'perfect-circle',
        name: 'A Perfect Circle',
        formationYear: 1999,
        genres: ['alternative-rock', 'alternative-metal', 'hard-rock'],
      });
    });
  });

  describe('should run validations',  () => {
    it('should run validations', async () => {
      initialize(firestore, { validateModels: true });

      const batch = new FirestoreBatchUnit(firestore);
      const bandRepository = new BaseFirestoreBatchRepository(batch, Band);

      const entity = new Band();
      entity.id = 'perfect-circle';
      entity.name = 'A Perfect Circle';
      entity.formationYear = 1999;
      entity.genres = ['alternative-rock', 'alternative-metal', 'hard-rock'];
      entity.contactEmail = 'Not an email';

      bandRepository.create(entity);

      try {
        await batch.commit();
      } catch (error) {
        expect(error[0].constraints.isEmail).to.equal('Invalid email!');
      }
    });

    it('should not run validations on delete', async () => {
      initialize(firestore, { validateModels: true });

      const batch = new FirestoreBatchUnit(firestore);
      const bandRepository = new BaseFirestoreBatchRepository(batch, Band);

      const entity = new Band();
      entity.id = 'perfect-circle';
      entity.name = 'A Perfect Circle';
      entity.formationYear = 1999;
      entity.genres = ['alternative-rock', 'alternative-metal', 'hard-rock'];
      entity.contactEmail = 'email@apc.com';

      bandRepository.create(entity);
      await batch.commit();

      entity.contactEmail = 'email';
      bandRepository.delete(entity);
      expect(batch.commit).to.not.to.throw();
    });
  });

  //TODO: for this to work I'll probably need to do the collectionPath refactor
  // Copy from BaseFirestoreTransactionRepository.spec
  // tslint:disable-next-line:no-empty
  describe('must handle subcollections', () => {});
});
