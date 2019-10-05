# Transactions

Fireorm also has support for [Firestore Transactions](https://firebase.google.com/docs/firestore/manage-data/transactions) with the [runTransaction](Classes/BaseFirestoreRepository.md#RunTransaction) methods in repositories. It receives a lamda function where the first parameter corresponds to a [TransactionRepository](Classes/TransactionRepository.md). The [TransactionRepository](Classes/TransactionRepository.md) is an special type of repository that has methods to create, retrieve, update and delete documents inside a transaction.

```typescript
import { GetRepository, Collection } from 'fireorm';
import Band from './wherever-our-models-are';

const bandRepository = GetRepository(Band);
const dt = new Band();
dt.id = 'dream-theater';
dt.name = 'DreamTheater';
dt.formationYear = 1985;

bandRepository.runTransaction(async tran => {
  await tran.create(dt);
});
```

## Batched Writes

Fireorm also has support for Firestore's [Batched Writes](https://firebase.google.com/docs/firestore/manage-data/transactions#batched-writes). Fireorm repositories have a [createBatch](Classes/BaseFirestoreRepository.md#CreateBatch) method that returns a [BatchRepository](Classes/FirestoreBatchRepository.md). The [BatchRepository](Classes/FirestoreBatchRepository.md) is an special type of repository that has methods to create, update and delete documents inside a batch. After adding all the operations that we want to run to the batch, we have to call the [commit](Classes/FirestoreBatchRepository.md#Commit) method to execute them.

```typescript
import { GetRepository, Collection } from 'fireorm';
import Band from './wherever-our-models-are';

const bandRepository = GetRepository(Band);
const dt = new Band();
dt.id = 'dream-theater';
dt.name = 'DreamTheater';
dt.formationYear = 1985;

const batch = bandRepository.createBatch();

batch.create(dt);

await batch.commit();
```

## Limitations

Please be aware that Firestore has many limitations when working with Transactions and BatchedWrites. You can learn more [here](https://firebase.google.com/docs/firestore/manage-data/transactions).
