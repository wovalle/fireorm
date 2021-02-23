# Realtime Updates

Fireorm can subscribe to change to a firestore collection. This is done by the [watch](Classes/BaseFirestoreRepository.md#watch), it receives a callback (listener) and fireorm will pass the entites that were added/changed as the first callback.

```typescript
const bandSnapshotUnsubscribe = await bandRepository
  .whereArrayContains(a => a.genres, 'progressive-metal')
  .watch(bands => {
    // Will be triggered when any band with progressive-metal genre are added/edited
  });
```

## Unsubscribing from updates

The `watch` method of fireorm's [repositories] return an unsubscribe function. When we want to stop listening collection updates we can call this function.

```typescript
const bandSnapshotUnsubscribe = await bandRepository
  .whereArrayContains(a => a.genres, 'progressive-metal')
  .watch(bands => {
    // Will be triggered when any band with progressive-metal genre are added/edited
  });

// We no longer need to listen real time updates, so we unsubscribe.
bandSnapshotUnsubscribe();
```

## Disabling empty updates

Firestore triggers the listener every single time something is edited in a collection, even though nothing has changed. To skip this, you can pas a `ignoreEmptyUpdate` boolean option to fireorm and it'll skip empty changes. This can option can be passed in the `initialize` (will affect every subscription) or as a second parameter of `watch` (will only affect this subscription).

```typescript
import { initialize } from 'fireorm';

initialize(firestore, {
  ignoreEmptyUpdates: true,
});
```

```typescript
const bandSnapshotUnsubscribe = await bandRepository
  .whereArrayContains(a => a.genres, 'progressive-metal')
  .watch(handleBandsUpdate, { ignoreEmptyUpdates: true });
```
