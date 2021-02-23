import { getRepository, Collection } from '../../src';
import { Band as BandEntity } from '../fixture';
import { getUniqueColName } from '../setup';

describe('Integration test: Simple Repository', () => {
  @Collection(getUniqueColName('band-snapshot-repository'))
  class Band extends BandEntity {
    extra?: { website: string };
  }

  test('should do crud operations', async () => {
    const bandRepository = getRepository(Band);

    // Create snapshot listener
    let executionIndex = 1;
    const handleBandsUpdate = (bands: Band[]) => {
      if (executionIndex == 1) {
        expect(bands.length).toEqual(1);
      } else if (executionIndex == 2) {
        expect(bands.length).toEqual(2);
      } else if (executionIndex == 3) {
        expect(bands.length).toEqual(2);

        bands.forEach(band => {
          if (band.id == 'dream-theater') {
            expect(band.name).toEqual('Dream Theatre');
          }
        });
      }
      executionIndex++;
    };

    const bandSnapshotUnsubscribe = await bandRepository
      .whereArrayContains(a => a.genres, 'progressive-metal')
      .watch(handleBandsUpdate, { ignoreEmptyUpdates: true });

    const dt = {
      id: 'dream-theater',
      name: 'DreamTheater',
      formationYear: 1985,
      genres: ['progressive-metal', 'progressive-rock'],
      lastShow: null,
    };

    // First execution
    await bandRepository.create(dt);

    // Second execution
    await bandRepository.create({
      name: 'Devin Townsend Project',
      formationYear: 2009,
      genres: ['progressive-metal', 'extreme-metal'],
      lastShow: null,
    });

    // Third execution
    await bandRepository.create({
      id: 'porcupine-tree',
      name: 'Porcupine Tree',
      formationYear: 2009,
      genres: ['psychedelic-rock', 'progressive-rock', 'progressive-metal'],
      lastShow: null,
    });

    // Update a band (fourth execution)
    dt.name = 'Dream Theater';

    // Fourth execution
    await bandRepository.update(dt);

    // Unsubscribe from snapshot
    bandSnapshotUnsubscribe();
  });
});
