import { GetRepository, Collection } from '../../src';
import { Band as BandEntity } from '../fixture';
import { expect } from 'chai';
import { getUniqueColName } from '../setup';

describe('Integration test: Simple Repository', () => {
  @Collection(getUniqueColName('band-simple-repository'))
  class Band extends BandEntity {
    extra?: { website: string };
  }

  const bandRepository = GetRepository(Band);

  it('should do crud operations', async () => {
    // Create a band
    const dt = new Band();
    dt.id = 'dream-theater';
    dt.name = 'DreamTheater';
    dt.formationYear = 1985;
    dt.genres = ['progressive-metal', 'progressive-rock'];
    dt.extra = {
      website: 'www.dreamtheater.net',
    };

    const savedBand = await bandRepository.create(dt);
    expect(savedBand.name).to.equal(dt.name);
    expect(savedBand.id).to.equal(dt.id);
    expect(savedBand.formationYear).to.equal(dt.formationYear);
    expect(savedBand.genres).to.equal(dt.genres);

    // Create a band without an id
    const devinT = new Band();
    devinT.name = 'Devin Townsend Project';
    devinT.formationYear = 2009;
    devinT.genres = ['progressive-metal', 'extreme-metal'];

    const savedBandWithoutId = await bandRepository.create(devinT);
    expect(savedBandWithoutId.name).to.equal(devinT.name);
    expect(savedBandWithoutId.id).to.equal(devinT.id);

    // Read a band
    const foundBand = await bandRepository.findById(dt.id);
    expect(foundBand.id).to.equal(dt.id);
    expect(foundBand.name).to.equal(dt.name);

    // Update a todo
    dt.name = 'Dream Theater';
    const updatedDt = await bandRepository.update(dt);
    const updatedDtInDb = await bandRepository.findById(dt.id);
    expect(updatedDt.name).to.equal(dt.name);
    expect(updatedDtInDb.name).to.equal(dt.name);

    // Filter a band by subfield
    const byWebsite = await bandRepository
      .whereEqualTo(a => a.extra.website, 'www.dreamtheater.net')
      .find();

    expect(byWebsite[0].id).to.equal('dream-theater');

    // Delete a band
    await bandRepository.delete(dt.id);
    const deletedBand = await bandRepository.findById(dt.id);
    expect(deletedBand).to.equal(null);
  });
});
