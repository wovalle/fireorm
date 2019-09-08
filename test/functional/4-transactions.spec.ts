import { GetRepository, Collection } from '../../src';
import { Band as BandEntity } from '../fixture';
import { expect } from 'chai';
import { getUniqueColName } from '../setup';

describe('Integration test: Transactions', () => {
  @Collection(getUniqueColName('transactions'))
  class Band extends BandEntity {
    extra?: { website: string };
  }

  const bandRepository = GetRepository(Band);

  it('should do crud operations inside transactions', async () => {
    // Create a band
    const dt = new Band();
    dt.id = 'dream-theater';
    dt.name = 'DreamTheater';
    dt.formationYear = 1985;
    dt.genres = ['progressive-metal', 'progressive-rock'];
    dt.extra = {
      website: 'www.dreamtheater.net',
    };

    let savedBand: Band = null;

    await bandRepository.runTransaction(async tran => {
      savedBand = await tran.create(dt);
    });

    expect(savedBand.name).to.equal(dt.name);
    expect(savedBand.id).to.equal(dt.id);
    expect(savedBand.formationYear).to.equal(dt.formationYear);
    expect(savedBand.genres).to.equal(dt.genres);

    // Create a band without an id inside transactions
    const devinT = new Band();
    devinT.name = 'Devin Townsend Project';
    devinT.formationYear = 2009;
    devinT.genres = ['progressive-metal', 'extreme-metal'];

    await bandRepository.runTransaction(async tran => {
      const savedBandWithoutId = await tran.create(devinT);
      expect(savedBandWithoutId.name).to.equal(devinT.name);
      expect(savedBandWithoutId.id).to.equal(devinT.id);
    });

    // Read a band inside transaction
    await bandRepository.runTransaction(async tran => {
      const foundBand = await tran.findById(dt.id);
      expect(foundBand.id).to.equal(dt.id);
      expect(foundBand.name).to.equal(dt.name);
    });

    // Update a band inside transaction
    await bandRepository.runTransaction(async tran => {
      const dream = await tran.findById(dt.id);

      dream.name = 'Dream Theater';
      const updatedDt = await tran.update(dream);
      expect(updatedDt.name).to.equal(dream.name);
    });

    // Verify what was done inside the last transaction
    const bandOutsideTransaction = await bandRepository.findById(dt.id);
    expect(bandOutsideTransaction.name).to.equal('Dream Theater');

    // Filter a band by subfield inside transaction
    await bandRepository.runTransaction(async tran => {
      const byWebsite = await tran
        .whereEqualTo(a => a.extra.website, 'www.dreamtheater.net')
        .find();
      expect(byWebsite[0].id).to.equal('dream-theater');
    });

    // Delete a band
    await bandRepository.runTransaction(async tran => {
      await tran.delete(dt.id);
    });

    const deletedBand = await bandRepository.findById(dt.id);
    expect(deletedBand).to.equal(null);
  });
});
