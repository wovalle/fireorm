import {
  getRepository,
  Collection,
  runTransaction,
  createBatch,
} from '../../src';
import { Band as BandEntity } from '../fixture';
import { expect } from 'chai';
import { getUniqueColName } from '../setup';

describe('Integration test: Transactions', () => {
  @Collection(getUniqueColName('band-with-transactions'))
  class Band extends BandEntity {
    extra?: { website: string };
  }

  const bandRepository = getRepository(Band);

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

    const savedBand = await bandRepository.runTransaction<Band>(async tran => {
      await tran.create(ti);
      return tran.create(dt);
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

  it('should do CRUD operations inside batchs in repositories', async () => {
    // Array of bands to batch-insert
    const bands = [
      {
        name: 'Opeth',
        formationYear: 1989,
        genres: [
          'progressive-death-metal',
          'progressive-metal',
          'progressive-rock',
          'custom-genre',
        ],
      },
      {
        name: '30 Seconds To Mars',
        formationYear: 1998,
        genres: ['alternative-rock', 'custom-genre'],
      },
    ];

    const createBatch = bandRepository.createBatch();
    bands.forEach(b => createBatch.create(b));

    await createBatch.commit();

    // Assert that bands were actually created
    const createdBands = await bandRepository
      .whereArrayContains(b => b.genres, 'custom-genre')
      .find();

    const orderedBands = createdBands.sort((a, b) =>
      b.name.localeCompare(a.name)
    );

    expect(orderedBands.length).to.eql(2);
    expect(orderedBands[0].name).to.eql(bands[0].name);
    expect(orderedBands[1].name).to.eql(bands[1].name);

    // Update website for all bands with an update batch
    const updateBatch = bandRepository.createBatch();

    createdBands.forEach(b => {
      b.extra = { website: 'https://fake.web' };
      updateBatch.update(b);
    });

    await updateBatch.commit();

    // Assert that bands were actually updated
    const updatedBands = await bandRepository
      .whereArrayContains(b => b.genres, 'custom-genre')
      .find();

    expect(updatedBands.length).to.eql(2);
    expect(updatedBands[0].extra.website).to.eql('https://fake.web');
    expect(updatedBands[1].extra.website).to.eql('https://fake.web');

    // Delete bands with an delete batch
    const deleteBatch = bandRepository.createBatch();

    createdBands.forEach(b => deleteBatch.delete(b));

    await deleteBatch.commit();

    // Assert that bands were actually deleted
    const deletedBands = await bandRepository
      .whereArrayContains(b => b.genres, 'custom-genre')
      .find();

    expect(deletedBands.length).to.eql(0);
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

    const savedBand = await runTransaction<Band>(async tran => {
      const bandTranRepository = tran.getRepository(Band);
      await bandTranRepository.create(ti);
      return bandTranRepository.create(dt);
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

    await runTransaction(async tran => {
      const bandTranRepository = tran.getRepository(Band);

      const savedBandWithoutId = await bandTranRepository.create(devinT);
      expect(savedBandWithoutId.name).to.equal(devinT.name);
      expect(savedBandWithoutId.id).to.equal(devinT.id);
    });

    // Read a band inside transaction
    await runTransaction(async tran => {
      const bandTranRepository = tran.getRepository(Band);

      const foundBand = await bandTranRepository.findById(dt.id);
      expect(foundBand.id).to.equal(dt.id);
      expect(foundBand.name).to.equal(dt.name);
    });

    // Update a band inside transaction
    const updatedBand = await runTransaction<Band>(async tran => {
      const bandTranRepository = tran.getRepository(Band);

      const dream = await bandTranRepository.findById(dt.id);

      dream.name = 'Dream Theater';
      const updatedDt = await bandTranRepository.update(dream);
      expect(updatedDt.name).to.equal(dream.name);
      return updatedDt;
    });

    // Verify what was done inside the last transaction
    const bandOutsideTransaction = await bandRepository.findById(dt.id);
    expect(bandOutsideTransaction.name).to.equal('Dream Theater');
    expect(updatedBand.name).to.equal('Dream Theater');

    // Filter a band by subfield inside transaction
    await runTransaction(async tran => {
      const bandTranRepository = tran.getRepository(Band);

      const byWebsite = await bandTranRepository
        .whereEqualTo(a => a.extra.website, 'www.dreamtheater.net')
        .find();
      expect(byWebsite[0].id).to.equal('dream-theater');
    });

    // Delete a band
    await runTransaction(async tran => {
      const bandTranRepository = tran.getRepository(Band);

      await bandTranRepository.delete(dt.id);
    });

    const deletedBand = await bandRepository.findById(dt.id);
    expect(deletedBand).to.equal(null);
  });

  it('should do CRUD operations inside batchs', async () => {
    // Array of bands to batch-insert
    const bands: Band[] = [
      {
        name: 'Opeth',
        formationYear: 1989,
        genres: [
          'progressive-death-metal',
          'progressive-metal',
          'progressive-rock',
          'custom-genre',
        ],
        lastShow: new Date(),
        id: 'opeth',
      },
      {
        name: '30 Seconds To Mars',
        formationYear: 1998,
        genres: ['alternative-rock', 'custom-genre'],
        lastShow: new Date(),
        id: '30-seconds-to-mars',
      },
    ];

    const batch = createBatch();
    const bandBatchRepository = batch.getRepository(Band);
    bands.forEach(b => bandBatchRepository.create(b));

    // TODO: the commit should be in the batch
    await batch.commit();

    // Assert that bands were actually created
    const createdBands = await bandRepository
      .whereArrayContains(b => b.genres, 'custom-genre')
      .find();

    const orderedBands = createdBands.sort((a, b) =>
      b.name.localeCompare(a.name)
    );

    expect(orderedBands.length).to.eql(2);
    expect(orderedBands[0].name).to.eql(bands[0].name);
    expect(orderedBands[1].name).to.eql(bands[1].name);

    // Update website for all bands with an update batch
    const updateBatch = createBatch();
    const bandUpdateBatch = updateBatch.getRepository(Band);

    createdBands.forEach(b => {
      b.extra = { website: 'https://fake.web' };
      bandUpdateBatch.update(b);
    });

    await updateBatch.commit();

    // Assert that bands were actually updated
    const updatedBands = await bandRepository
      .whereArrayContains(b => b.genres, 'custom-genre')
      .find();

    expect(updatedBands.length).to.eql(2);
    expect(updatedBands[0].extra.website).to.eql('https://fake.web');
    expect(updatedBands[1].extra.website).to.eql('https://fake.web');

    // Delete bands with an delete batch
    const deleteBatch = createBatch();
    const bandDeleteBatch = deleteBatch.getRepository(Band);

    createdBands.forEach(b => bandDeleteBatch.delete(b));

    await deleteBatch.commit();

    // Assert that bands were actually deleted
    const deletedBands = await bandRepository
      .whereArrayContains(b => b.genres, 'custom-genre')
      .find();

    expect(deletedBands.length).to.eql(0);
  });
});
