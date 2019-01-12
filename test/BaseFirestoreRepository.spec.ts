import MockFirebase from 'mock-cloud-firestore';
import BaseFirestoreRepository from '../src/BaseFirestoreRepository';
import { getFixture, User } from '../test/fixture';
import { expect } from 'chai';

// TODO: explicitely enforce entities to extend {id: string} (IEntity)
class UserRepository extends BaseFirestoreRepository<User> {}

describe('Repository', () => {
  let userRep: BaseFirestoreRepository<User> | null = null;

  beforeEach(() => {
    const fixture = Object.assign({}, getFixture());
    const firebase = new MockFirebase(fixture, {
      isNaiveSnapshotListenerEnabled: false,
    });

    const firestore = firebase.firestore();
    userRep = new UserRepository(firestore, 'users');
  });

  describe('findById', () => {
    it('must find by id', async () => {
      const roy = await userRep.findById('roy');
      expect(roy.id).to.equal('roy');
      expect(roy.firstName).to.equal('Roy');
    });
    it('must return T'); // TODO: Right now roy instanceof User === false, investigate
    it('return null if not found', async () => {
      const douglas = await userRep.findById('douglas');
      expect(douglas).to.be.null;
    });
  });

  describe('create', () => {
    it('must create item and return T', async () => {
      const entity = new User();
      entity.id = 'douglas';
      entity.firstName = 'Douglas';
      entity.lastName = 'Reynholm';
      entity.birthDate = new Date();

      const douglas = await userRep.create(entity);
      expect(douglas.id).to.equal(entity.id);
      expect(douglas.firstName).to.equal(entity.firstName);
      expect(douglas.lastName).to.equal(entity.lastName);
      expect(douglas.birthDate).to.equal(entity.birthDate);
    });
  });

  describe('update', () => {
    it('must update and return updated item', async () => {
      const roy = await userRep.findById('roy');
      roy.lastName = 'Crowd';
      const updatedRoy = await userRep.update(roy);
      expect(roy.lastName).to.equal(updatedRoy.lastName);
    });
    it('must only update changed fields'); // TODO: Discuss
    it('must throw if item is not found');
  });

  describe('delete', () => {
    it('must delete item', async () => {
      await userRep.delete('roy');
      const roy = await userRep.findById('roy');
      expect(roy).to.be.null;
    });
    it('must throw if item is not found', async () => {
      // tslint:disable-next-line:no-void-expression
      expect(await userRep.delete('lol')).to.throw;
    });
  });

  describe('.where*', () => {
    it('must return T[]');

    it("must return same list if where filter doesn't apply", async () => {
      const list = await userRep
        .whereGreaterOrEqualThan('birthDate', new Date(1950, 12, 12))
        .find();
      expect(list.length).to.equal(3);
    });

    it('must filter with whereEqualTo', async () => {
      const list = await userRep.whereEqualTo('firstName', 'Roy').find();
      expect(list.length).to.equal(1);
      expect(list[0].firstName).to.equal('Roy');
    });

    it('must filter with whereGreaterThan', async () => {
      const list = await userRep
        .whereGreaterThan('birthDate', new Date('1978-03-09'))
        .find();
      expect(list.length).to.equal(1);
    });

    it('must filter with whereGreaterOrEqualThan', async () => {
      const list = await userRep
        .whereGreaterOrEqualThan('birthDate', new Date(1978, 2, 9))
        .find();
      expect(list.length).to.equal(2);
    });

    it('must filter with whereLessThan');
    it('must filter with whereLessOrEqualThan');
    it('must filter with whereArrayCointain');
    it('must filter with two or more operators');
  });

  // describe('must handle subcollections');
  // describe('getRepository');
});
