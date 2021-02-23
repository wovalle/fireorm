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
      if (!bands.length) {
        return;
      }
      if (executionIndex == 1) {
        expect(bands.length).toEqual(1);
      } else if (executionIndex == 2) {
        expect(bands.length).toEqual(2);
      } else if (executionIndex == 3) {
        expect(bands.length).toEqual(2);

        bands.forEach(band => {
          if (band.id == 'dream-theatre') {
            expect(band.name).toEqual('Dream Theatre');
          }
        });
      }
      executionIndex++;
    };

    const bandSnapshotUnsubscribe = await bandRepository
      .whereEqualTo(a => a.extra.website, 'www.dreamtheater.net')
      .watch(handleBandsUpdate);

    // Create a band (execution 1)
    const dt = new Band();
    dt.id = 'dream-theater';
    dt.name = 'DreamTheater';
    dt.formationYear = 1985;
    dt.genres = ['progressive-metal', 'progressive-rock'];
    dt.extra = {
      website: 'www.dreamtheater.net',
    };

    // First execution
    await bandRepository.create(dt);

    // Create a band without an id (second execution)
    const devinT = new Band();
    devinT.name = 'Devin Townsend Project';
    devinT.formationYear = 2009;
    devinT.genres = ['progressive-metal', 'extreme-metal'];
    devinT.extra = {
      website: 'www.dreamtheater.net',
    };

    // Third Execution
    await bandRepository.create(devinT);

    // Update a band (fourth execution)
    dt.name = 'Dream Theater';
    await bandRepository.update(dt);
    await bandRepository.findById(dt.id);

    // Unsubscribe from snapshot
    bandSnapshotUnsubscribe();
  });
});
