# Batches

Fireorm also has support for Firestore's [Batched Writes](https://firebase.google.com/docs/firestore/manage-data/transactions#batched-writes).

## Batches inside repositories

Fireorm [repositories](CORE_CONCEPTS.md#FireormRepositories) have a [createBatch](Classes/BaseFirestoreRepository.md#CreateBatch) method that returns a [BatchRepository](Classes/FirestoreBatchRepository.md). The [BatchRepository](Classes/FirestoreBatchRepository.md) is an special type of repository that has methods to create, update and delete documents inside a batch. After adding all the operations that we want to run to the batch, we have to call the [commit](Classes/FirestoreBatchRepository.md#Commit) method to execute them.

```typescript
import { getRepository, Collection } from 'fireorm';
import Band from './wherever-our-models-are';

const bandRepository = getRepository(Band);
const dt = new Band();
dt.id = 'dream-theater';
dt.name = 'DreamTheater';
dt.formationYear = 1985;

const batch = bandRepository.createBatch();

batch.create(dt);

await batch.commit();
```

## Batches in multiple repositories

Fireorm exports a [createBatch](Classes/BaseFirestoreRepository.md#CreateBatch) method that can be used to create batches with one or multiple repositories. It receives a lamda function where the first parameter corresponds to a [FirestoreBatch](Classes/FirestoreBatch.md) class. This class exposes a `getRepository` method that receives an [Model class](CORE_CONCEPTS.md#FireormModels) and returns a [BatchRepository](Classes/BatchRepository.md) of the given entity and can be used to create, update and delete documents. Once all operations are defined, we have to call the `commit` method of our BatchRepository to commit all the operations.

```typescript
import { createBatch } from 'fireorm';
import { Band, Album } from './wherever-our-models-are';

const band = new Band();
band.id = 'dream-theater';
band.name = 'DreamTheater';
band.formationYear = 1985;

const album1 = new Album();
album1.name = 'When Dream and Day Unite';
album1.releaseDate = new Date('1989-03-06T00:00:00.000Z');
album1.bandId = band.id;

const album2 = new Album();
album2.name = 'Images and Words';
album2.releaseDate = new Date('1992-07-07T00:00:00.000Z');
album2.bandId = band.id;

const batch = createBatch();

const bandBatchRepository = batch.getRepository(Band);
const albumBatchRepository = batch.getRepository(Album);

bandBatchRepository.create(band);
albumBatchRepository.create(album1);
albumBatchRepository.create(album2);

await batch.commit();
```

## Limitations

Please be aware that Firestore has many limitations when working with BatchedWrites. You can learn more [here](https://firebase.google.com/docs/firestore/manage-data/transactions).
