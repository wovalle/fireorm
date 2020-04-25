import {
  getRepository,
  Collection,
  runTransaction,
  BaseFirestoreRepository,
} from '../../src';
import { Band as BandEntity } from '../fixture';
import { getUniqueColName } from '../setup';

describe('Integration test: Transactions', () => {
  @Collection(getUniqueColName('band-with-transactions'))
  class Band extends BandEntity {
    extra?: { website: string };
  }

  let bandRepository: BaseFirestoreRepository<Band> = null;

  beforeEach(() => {
    bandRepository = getRepository(Band);
  });

  it('should do CRUD operations inside transactions in repositories', async () => {
    // Create a band
    const dt = new Band();
    dt.id = 'dream-theater';
    dt.name = 'DreamTheater';
    dt.formationYear = 1985;
    dt.genres = ['progressive-metal', 'progressive-rock'];
    dt.extra = {
      website: 'www.dreamtheater.net',
    };

    // Create another band
    const ti = new Band();
    ti.id = 'tame-impala';
    ti.name = 'Tame Impala';
    ti.formationYear = 2007;
    ti.genres = ['psychedelic-pop', 'psychedelic-rock', 'neo-psychedelia'];
    ti.extra = {
      website: 'www.tameimpala.com',
    };

    // Transactions can return data
    const savedBand = await bandRepository.runTransaction<Band>(
      async (tran) => {
        await tran.create(ti);
        return tran.create(dt);
      }
    );

    expect(savedBand.name).toEqual(dt.name);
    expect(savedBand.id).toEqual(dt.id);
    expect(savedBand.formationYear).toEqual(dt.formationYear);
    expect(savedBand.genres).toEqual(dt.genres);

    // Create a band without an id inside transactions
    const devinT = new Band();
    devinT.name = 'Devin Townsend Project';
    devinT.formationYear = 2009;
    devinT.genres = ['progressive-metal', 'extreme-metal'];

    await bandRepository.runTransaction(async (tran) => {
      const savedBandWithoutId = await tran.create(devinT);
      expect(savedBandWithoutId.name).toEqual(devinT.name);
      expect(savedBandWithoutId.id).toEqual(devinT.id);
    });

    // Read a band inside transaction
    await bandRepository.runTransaction(async (tran) => {
      const foundBand = await tran.findById(dt.id);
      expect(foundBand.id).toEqual(dt.id);
      expect(foundBand.name).toEqual(dt.name);
    });

    // Update a band inside transaction
    await bandRepository.runTransaction(async (tran) => {
      const dream = await tran.findById(dt.id);

      dream.name = 'Dream Theater';
      const updatedDt = await tran.update(dream);
      expect(updatedDt.name).toEqual(dream.name);
    });

    // Verify what was done inside the last transaction
    const bandOutsideTransaction = await bandRepository.findById(dt.id);
    expect(bandOutsideTransaction.name).toEqual('Dream Theater');

    // Filter a band by subfield inside transaction
    await bandRepository.runTransaction(async (tran) => {
      const byWebsite = await tran
        .whereEqualTo((a) => a.extra.website, 'www.dreamtheater.net')
        .find();
      expect(byWebsite[0].id).toEqual('dream-theater');
    });

    // Delete a band
    await bandRepository.runTransaction(async (tran) => {
      await tran.delete(dt.id);
    });

    const deletedBand = await bandRepository.findById(dt.id);
    expect(deletedBand).toEqual(null);
  });

  it('should do CRUD operations inside transactions', async () => {
    // Create a band
    const dt = new Band();
    dt.id = 'dream-theater';
    dt.name = 'DreamTheater';
    dt.formationYear = 1985;
    dt.genres = ['progressive-metal', 'progressive-rock'];
    dt.extra = {
      website: 'www.dreamtheater.net',
    };

    // Create another band
    const ti = new Band();
    ti.id = 'tame-impala';
    ti.name = 'Tame Impala';
    ti.formationYear = 2007;
    ti.genres = ['psychedelic-pop', 'psychedelic-rock', 'neo-psychedelia'];
    ti.extra = {
      website: 'www.tameimpala.com',
    };

    const savedBand = await runTransaction<Band>(async (tran) => {
      const bandTranRepository = tran.getRepository(Band);
      await bandTranRepository.create(ti);
      return bandTranRepository.create(dt);
    });

    expect(savedBand.name).toEqual(dt.name);
    expect(savedBand.id).toEqual(dt.id);
    expect(savedBand.formationYear).toEqual(dt.formationYear);
    expect(savedBand.genres).toEqual(dt.genres);

    // Create a band without an id inside transactions
    const devinT = new Band();
    devinT.name = 'Devin Townsend Project';
    devinT.formationYear = 2009;
    devinT.genres = ['progressive-metal', 'extreme-metal'];

    await runTransaction(async (tran) => {
      const bandTranRepository = tran.getRepository(Band);

      const savedBandWithoutId = await bandTranRepository.create(devinT);
      expect(savedBandWithoutId.name).toEqual(devinT.name);
      expect(savedBandWithoutId.id).toEqual(devinT.id);
    });

    // Read a band inside transaction
    await runTransaction(async (tran) => {
      const bandTranRepository = tran.getRepository(Band);

      const foundBand = await bandTranRepository.findById(dt.id);
      expect(foundBand.id).toEqual(dt.id);
      expect(foundBand.name).toEqual(dt.name);
    });

    // Update a band inside transaction
    const updatedBand = await runTransaction<Band>(async (tran) => {
      const bandTranRepository = tran.getRepository(Band);

      const dream = await bandTranRepository.findById(dt.id);

      dream.name = 'Dream Theater';
      const updatedDt = await bandTranRepository.update(dream);
      expect(updatedDt.name).toEqual(dream.name);
      return updatedDt;
    });

    // Verify what was done inside the last transaction
    const bandOutsideTransaction = await bandRepository.findById(dt.id);
    expect(bandOutsideTransaction.name).toEqual('Dream Theater');
    expect(updatedBand.name).toEqual('Dream Theater');

    // Filter a band by subfield inside transaction
    await runTransaction(async (tran) => {
      const bandTranRepository = tran.getRepository(Band);

      const byWebsite = await bandTranRepository
        .whereEqualTo((a) => a.extra.website, 'www.dreamtheater.net')
        .find();
      expect(byWebsite[0].id).toEqual('dream-theater');
    });

    // Delete a band
    await runTransaction(async (tran) => {
      const bandTranRepository = tran.getRepository(Band);

      await bandTranRepository.delete(dt.id);
    });

    const deletedBand = await bandRepository.findById(dt.id);
    expect(deletedBand).toEqual(null);
  });
});
