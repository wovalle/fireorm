import { expect } from 'chai';
const MockFirebase = require('mock-cloud-firestore');
import { BaseFirestoreBatchRepository } from './BaseFirestoreBatchRepository';
import { getFixture } from '../../test/fixture';
import { initialize } from '../MetadataStorage';
import { Band } from '../../test/BandCollection';
import { Firestore, WriteBatch } from '@google-cloud/firestore';
import sinon from 'sinon';

describe('BaseFirestoreBatchRepository', () => {
  let bandRepository: BaseFirestoreBatchRepository<Band> = null;
  let firestore: Firestore;
  let batchStub: sinon.SinonStubbedInstance<WriteBatch>;

  beforeEach(() => {
    const fixture = Object.assign({}, getFixture());
    const firebase = new MockFirebase(fixture, {
      isNaiveSnapshotListenerEnabled: false,
    });

    batchStub = sinon.createStubInstance(WriteBatch);

    firestore = Object.assign(firebase.firestore(), { batch: () => batchStub });
    initialize(firestore);

    const batch = firestore.batch();
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

      entity.name = 'Un Círculo Perfecto';
      bandRepository.update(entity);

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

      expect(batchStub.delete.firstCall.lastArg).to.eql({
        id: 'perfect-circle',
        name: 'A Perfect Circle',
        formationYear: 1999,
        genres: ['alternative-rock', 'alternative-metal', 'hard-rock'],
      });
    });
  });

  // TODO: Maybe refactor validations to be a Decorator
  // tslint:disable-next-line:no-empty
  describe('should run validations', () => {});

  //TODO: for this to work I'll probably need to do the collectionPath refactor
  // Copy from BaseFirestoreTransactionRepository.spec
  // tslint:disable-next-line:no-empty
  describe('must handle subcollections', () => {});
});
