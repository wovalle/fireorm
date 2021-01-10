import { getRepository, Collection, initialize } from '../../src';
import { Band as BandEntity } from '../fixture';
import { getUniqueColName } from '../setup';
import { IsEmail } from 'class-validator';
import { Firestore } from '@google-cloud/firestore';

describe('Integration test: Validations', () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const firestore = (global as any).firestoreRef as Firestore;
  initialize(firestore, { validateModels: true });

  @Collection(getUniqueColName('validations'))
  class Band extends BandEntity {
    @IsEmail()
    contactEmail: string;
  }

  const bandRepository = getRepository(Band);

  it('should do crud operations with validations', async () => {
    // Should create a band when passing a valid email
    const dt = new Band();
    dt.id = 'dream-theater';
    dt.name = 'DreamTheater';
    dt.contactEmail = 'dream@theater.com';
    await bandRepository.create(dt);

    const foundBand = await bandRepository.findById(dt.id);
    expect(foundBand.id).toEqual(dt.id);
    expect(foundBand.contactEmail).toEqual(dt.contactEmail);

    // Should update a band when passing a valid email
    dt.contactEmail = 'mail@example.com';
    await bandRepository.update(dt);

    const updatedDtInDb = await bandRepository.findById(dt.id);
    expect(updatedDtInDb.contactEmail).toEqual('mail@example.com');

    // Should throw when trying to create a band with an invalid email
    const sw = new Band();
    sw.id = 'steven-wilson';
    sw.name = 'Steven Wilson';
    sw.contactEmail = 'stevenwilson.com';

    expect(bandRepository.create(sw)).rejects.toBeTruthy();

    // Should throw when trying to update a band with an invalid email
    dt.contactEmail = 'dreamtheater.com';

    try {
      await bandRepository.update(dt);
      expect(false).toBeTruthy();
    } catch (err) {
      expect(err).toBeTruthy();
    }
  });
});
