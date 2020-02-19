import { getRepository, Collection, createBatch } from '../../src';
import { Band as BandEntity } from '../fixture';
import { expect } from 'chai';
import { getUniqueColName } from '../setup';

describe('Integration test: Batchs', () => {
  @Collection(getUniqueColName('band-in-batch'))
  class Band extends BandEntity {
    extra?: { website: string };
  }

  const bandRepository = getRepository(Band);

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
        lastShow: new Date(),
        extra: {
          website: '',
        },
      },
      {
        name: '30 Seconds To Mars',
        formationYear: 1998,
        genres: ['alternative-rock', 'custom-genre'],
        lastShow: new Date(),
        extra: {
          website: '',
        },
      },
    ];

    const batch = bandRepository.createBatch();
    bands.forEach(b => batch.create(b));

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
