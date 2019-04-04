import {
  Initialize,
  CustomRepository,
  BaseFirestoreRepository,
  GetRepository,
} from '../../src';
import * as admin from 'firebase-admin';
import { Band } from '../utils/entities';
import { getInitialSeed } from '../utils/seed';

const serviceAccount = require('../firestore.creds.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: `https://${serviceAccount.project_id}.firebaseio.com`,
});

const firestore = admin.firestore();
firestore.settings({
  timestampsInSnapshots: true,
});
Initialize(firestore);

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

const run = async () => {
  // Saving initial seed
  const seed = getInitialSeed().map(b => rockBandRepository.create(b));
  await Promise.all(seed);

  const band = new Band();
  band.id = 'opeth';
  band.name = 'Opeth';
  band.formationYear = 1989;
  band.genres = [
    'progressive-death-metal',
    'progressive-metal',
    'progressive-rock',
  ];

  const opeth = await rockBandRepository.create(band);
  console.log(`Created rock band with id: ${opeth.id}`);
  console.table(opeth);

  // Filter bands with genre progressive-rock, check that since we didn't
  // called .find in the repository method, we have to do it here
  const progressiveRockBands = await rockBandRepository
    .filterByGenre('progressive-rock')
    .find();

  console.log(
    `Progressive rock bands: ${progressiveRockBands.map(p => p.name)}`
  );

  // Filter progressive-rock bands formed in 1989
  const millenialProgressiveRockBands = await rockBandRepository
    .filterByGenre('progressive-rock')
    .whereEqualTo('formationYear', 1989)
    .find();

  console.log(
    `Progressive rock bands formed in 1989: ${millenialProgressiveRockBands.map(
      p => p.name
    )}`
  );
};

run().catch(e => console.error(e));
