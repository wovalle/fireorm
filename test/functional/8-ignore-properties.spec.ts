import { Collection, getRepository, Ignore } from '../../src';
import { Band as BandEntity } from '../fixture';
import { getUniqueColName } from '../setup';

describe('Integration test: Ignore Properties', () => {
  @Collection(getUniqueColName('band-simple-repository'))
  class Band extends BandEntity {
    @Ignore()
    temporaryName: string;
  }

  test('should ignore properties decorated with Ignore()', async () => {
    const bandRepository = getRepository(Band);
    // Create a band
    const dt = new Band();
    dt.id = 'dream-theater';
    dt.name = 'DreamTheater';
    dt.temporaryName = 'Drömteater';

    await bandRepository.create(dt);

    // Read a band
    const foundBand = await bandRepository.findById(dt.id);
    expect(foundBand.id).toEqual(dt.id);
    expect(foundBand.name).toEqual(dt.name);
    expect(foundBand).not.toHaveProperty('temporaryName');
  });
});
