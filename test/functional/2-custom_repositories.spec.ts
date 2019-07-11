import { getInitialData, Band as BandEntity } from '../fixture';
import {
  CustomRepository,
  BaseFirestoreRepository,
  GetRepository,
  Collection,
} from '../../src';
import { expect } from 'chai';
import { getUniqueColName } from '../setup';

describe('Integration test: Custom Repository', () => {
  @Collection(getUniqueColName('band'))
  class Band extends BandEntity {}

  @CustomRepository(Band)
  class CustomRockBandRepository extends BaseFirestoreRepository<Band> {
    filterByGenre(genre: string) {
      return this.whereArrayContains('genres', genre);
    }
  }

  // GetRepository will return the custom repository of Band
  // (if it has the @CustomRepository decorator). Since typescript
  // cannot guess dynamic types, we'll have to cast it to the
  // custom repository
  const rockBandRepository = GetRepository(Band) as CustomRockBandRepository;

  before(async () => {
    const seed = getInitialData().map(b => rockBandRepository.create(b));
    await Promise.all(seed);
  });

  it('should use custom repository', async () => {
    const band = new Band();
    band.id = 'opeth';
    band.name = 'Opeth';
    band.formationYear = 1989;
    band.genres = [
      'progressive-death-metal',
      'progressive-metal',
      'progressive-rock',
    ];

    await rockBandRepository.create(band);

    // Filter bands with genre progressive-rock, check that since we didn't
    // called .find in the repository method, we have to do it here
    const progressiveRockBands = await rockBandRepository
      .filterByGenre('progressive-rock')
      .find();

    const [first, second, third] = progressiveRockBands
      .map(b => b.name)
      .sort((a, b) => a.localeCompare(b));

    expect(progressiveRockBands.length).to.equal(3);
    expect(first).to.equal('Opeth');
    expect(second).to.equal('Pink Floyd');
    expect(third).to.equal('Porcupine Tree');

    // Filter progressive-rock bands formed in 1989
    const millenialProgressiveRockBands = await rockBandRepository
      .filterByGenre('progressive-rock')
      .whereEqualTo('formationYear', 1989)
      .find();

    expect(millenialProgressiveRockBands.length).to.equal(1);
    expect(progressiveRockBands[0].name).to.equal('Opeth');
  });
});
