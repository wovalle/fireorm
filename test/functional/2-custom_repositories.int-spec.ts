import { getInitialData, Band as BandEntity } from '../fixture';
import { CustomRepository, BaseFirestoreRepository, getRepository, Collection } from '../../src';
import { getUniqueColName } from '../setup';

describe('Integration test: Custom Repository', () => {
  @Collection(getUniqueColName('band-custom-repository'))
  class Band extends BandEntity {}

  @CustomRepository(Band)
  class CustomRockBandRepository extends BaseFirestoreRepository<Band> {
    filterByGenre(genre: string) {
      return this.whereArrayContains('genres', genre);
    }
  }

  // getRepository will return the custom repository of Band
  // (if it has the @CustomRepository decorator). Since typescript
  // cannot guess dynamic types, we'll have to cast it to the
  // custom repository
  let rockBandRepository: CustomRockBandRepository = null;

  beforeEach(async () => {
    // see comment above
    rockBandRepository = getRepository(Band) as CustomRockBandRepository;

    const seed = getInitialData().map(b => rockBandRepository.create(b));
    await Promise.all(seed);
  });

  it('should use custom repository', async () => {
    const band = new Band();
    band.id = 'opeth';
    band.name = 'Opeth';
    band.formationYear = 1989;
    band.genres = ['progressive-death-metal', 'progressive-metal', 'progressive-rock'];

    await rockBandRepository.create(band);

    // Filter bands with genre progressive-rock, check that since we didn't
    // called .find in the repository method, we have to do it here
    const progressiveRockBands = await rockBandRepository.filterByGenre('progressive-rock').find();

    const [first, second, third] = progressiveRockBands
      .map(b => b.name)
      .sort((a, b) => a.localeCompare(b));

    expect(progressiveRockBands.length).toEqual(3);
    expect(first).toEqual('Opeth');
    expect(second).toEqual('Pink Floyd');
    expect(third).toEqual('Porcupine Tree');

    // Filter progressive-rock bands formed in 1989
    const millenialProgressiveRockBands = await rockBandRepository
      .filterByGenre('progressive-rock')
      .whereEqualTo('formationYear', 1989)
      .find();

    expect(millenialProgressiveRockBands.length).toEqual(1);
    expect(progressiveRockBands[0].name).toEqual('Opeth');
  });
});
