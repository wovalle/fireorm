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

## Transaction in subcollections

If we create an entity inside a transactions, all of its subcollections will be automatically be a [TransactionRepository](Classes/TransactionRepository.md) that means that all of the operations done to subcollections will also be done inside transactions. Once the transaction is finished fireorm will automatically change the [TransactionRepository](Classes/TransactionRepository.md) for a normal [BaseFirestoreRepository](CORE_CONCEPTS.md#FireormRepositories) in case you need to reuse the entity.

```ts
import { runTransaction } from 'fireorm';
import { Band, Album } from './wherever-our-models-are';

const band = new Band();
band.id = 'tame-impala';
band.name = 'Tame Impala';
band.formationYear = 2007;

const albums = [
  {
    id: 'currents',
    name: 'Currents',
    releaseDate: new Date('2015-07-17T00:00:00.000Z'),
  },
  {
    id: 'slow-rush',
    name: 'The Slow Rush',
    releaseDate: new Date('2020-02-14T00:00:00.000Z'),
  },
];

await runTransaction<Band>(async tran => {
  const bandTranRepository = tran.getRepository(Band);

  // Create the band inside transaction.
  // Band contains a subcollection of Albums in the field albums, so when the band is created it will contain an albums field with TransactionRepository<Album> type.
  const createdBand = await bandTranRepository.create(band);

  // Once the band is created, save the albums
  for (const album of albums) {
    await createdBand.albums.create(album);
  }

  // Outside of the transaction, albums will be a BaseFirestoreRepository<Album>
  return createdBand;
});
```

## Limitations

Please be aware that Firestore has many limitations when working with transactions. You can learn more [here](https://firebase.google.com/docs/firestore/manage-data/transactions). The most notable ones are that inside Transactions all the read operations must be done first (i.e. if you need to fetch some documents from firestore and edit it inside a transaction, you must fetch everything you need before doing creating/updating/deleting any document). Also, transactions cannot contain any `limit` or `orderBy` clauses (as defined [here](READ_DATA.md#orderbyandlimit)).
