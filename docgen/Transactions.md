# Transactions

Fireorm also has support for [Firestore Transactions](https://firebase.google.com/docs/firestore/manage-data/transactions) inside a single [repository]() and between multiple repositories.

## Transactions inside repositories

Fireorm [repositories](CORE_CONCEPTS.md#FireormRepositories) have a [runTransaction](Classes/BaseFirestoreRepository.md#RunTransaction) method. It receives a lamda function where the first parameter corresponds to a [TransactionRepository](Classes/TransactionRepository.md). The [TransactionRepository](Classes/TransactionRepository.md) is an special type of repository that has methods to create, retrieve, update and delete documents inside a transaction.

```typescript
import { getRepository, Collection } from 'fireorm';
import Band from './wherever-our-models-are';

const bandRepository = getRepository(Band);
const dt = new Band();
dt.id = 'dream-theater';
dt.name = 'DreamTheater';
dt.formationYear = 1985;

bandRepository.runTransaction(async tran => {
  await tran.create(dt);
});
```

## Transactions in multiple repositories

Fireorm exports a [runTransaction](Classes/BaseFirestoreRepository.md#RunTransaction) method that can be used to create transactions with one or multiple repositories. It receives a lamda function where the first parameter corresponds to a [FirestoreTransaction](Classes/FirestoreTransaction.md) class. This class exposes a `getRepository` method that receives an [Model class](CORE_CONCEPTS.md#FireormModels) and returns a [TransactionRepository](Classes/TransactionRepository.md) of the given entity and can be used to create, retrieve, update and delete documents inside a transaction.

```typescript
import { runTransaction } from 'fireorm';
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

await runTransaction(async tran => {
  const bandTranRepository = tran.getRepository(Band);
  const albumTranRepository = tran.getRepository(Album);

  await bandTranRepository.create(band);
  await albumTranRepository.create(album1);
  await albumTranRepository.create(album2);
});
```

## Returning values from transactions

If you need to return data from transactions, [runTransaction](Classes/BaseFirestoreRepository.md#RunTransaction) receives a [type parameter](https://www.typescriptlang.org/docs/handbook/generics.html#using-type-parameters-in-generic-constraints) of the output value of your transaction.

```typescript
import { runTransaction } from 'fireorm';
import { Band } from './wherever-our-models-are';

const band = new Band();
band.id = 'dream-theater';
band.name = 'DreamTheater';
band.formationYear = 1985;

await runTransaction<Band>(async tran => {
  const bandTranRepository = tran.getRepository(Band);
  const albumTranRepository = tran.getRepository(Album);

  return bandTranRepository.create(band);
});
```

## Limitations

Please be aware that Firestore has many limitations when working with transactions. You can learn more [here](https://firebase.google.com/docs/firestore/manage-data/transactions).
