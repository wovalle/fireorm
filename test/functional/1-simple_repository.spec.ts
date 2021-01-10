import { getRepository, Collection } from '../../src';
import { Band as BandEntity } from '../fixture';
import { getUniqueColName } from '../setup';

describe('Integration test: Simple Repository', () => {
  @Collection(getUniqueColName('band-simple-repository'))
  class Band extends BandEntity {
    extra?: { website: string };
  }

  test('should do crud operations', async () => {
    const bandRepository = getRepository(Band);
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
    expect(savedBand.name).toEqual(dt.name);
    expect(savedBand.id).toEqual(dt.id);
    expect(savedBand.formationYear).toEqual(dt.formationYear);
    expect(savedBand.genres).toEqual(dt.genres);

    // Create a band without an id
    const devinT = new Band();
    devinT.name = 'Devin Townsend Project';
    devinT.formationYear = 2009;
    devinT.genres = ['progressive-metal', 'extreme-metal'];

    const savedBandWithoutId = await bandRepository.create(devinT);
    expect(savedBandWithoutId.name).toEqual(devinT.name);
    expect(savedBandWithoutId.id).toEqual(devinT.id);

    // Read a band
    const foundBand = await bandRepository.findById(dt.id);
    expect(foundBand.id).toEqual(dt.id);
    expect(foundBand.name).toEqual(dt.name);

    // Update a band
    dt.name = 'Dream Theater';
    const updatedDt = await bandRepository.update(dt);
    const updatedDtInDb = await bandRepository.findById(dt.id);
    expect(updatedDt.name).toEqual(dt.name);
    expect(updatedDtInDb.name).toEqual(dt.name);

    // Filter a band by subfield
    const byWebsite = await bandRepository
      .whereEqualTo(a => a.extra.website, 'www.dreamtheater.net')
      .find();
    expect(byWebsite[0].id).toEqual('dream-theater');

    // Find one band matching some criteria
    const byWebsiteOne = await bandRepository.whereEqualTo(a => a.name, 'Dream Theater').findOne();
    expect(byWebsiteOne.id).toEqual('dream-theater');

    // Find two bands matching some criteria
    const whereIn = await bandRepository
      .whereIn(a => a.name, ['Dream Theater', 'Devin Townsend Project'])
      .find();
    expect(whereIn.length).toEqual(2);

    // Find two bands matching some criteria
    const whereArrayIn = await bandRepository
      .whereArrayContainsAny(a => a.genres, ['progressive-metal'])
      .find();
    expect(whereArrayIn.length).toEqual(2);

    // Should be able to run transactions
    await bandRepository.runTransaction(async tran => {
      const band = await tran.findById('dream-theater');
      band.name = 'Teatro del sueño';
      await tran.update(band);
    });

    const updated = await bandRepository.findById('dream-theater');
    expect(updated.name).toEqual('Teatro del sueño');

    // Delete a band
    await bandRepository.delete(dt.id);
    const deletedBand = await bandRepository.findById(dt.id);
    expect(deletedBand).toEqual(null);
  });
});
