import { getRepository, Collection } from '../../src';
import { Band as BandEntity } from '../fixture';
import { expect } from 'chai';
import { getUniqueColName } from '../setup';
import { IsEmail } from 'class-validator';

describe('Integration test: Validations', () => {
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
    expect(foundBand.id).to.equal(dt.id);
    expect(foundBand.contactEmail).to.equal(dt.contactEmail);

    // Should update a band when passing a valid email
    dt.contactEmail = 'mail@example.com';
    await bandRepository.update(dt);

    const updatedDtInDb = await bandRepository.findById(dt.id);
    expect(updatedDtInDb.contactEmail).to.equal('mail@example.com');

    // Should throw when trying to create a band with an invalid email
    const sw = new Band();
    sw.id = 'steven-wilson';
    sw.name = 'Steven Wilson';
    sw.contactEmail = 'stevenwilson.com';

    expect(async () => await bandRepository.create(sw)).to.throw;

    // Should throw when trying to update a band with an invalid email
    dt.contactEmail = 'dreamtheater.com';
    expect(async () => await bandRepository.update(dt)).to.throw;
  });
});
