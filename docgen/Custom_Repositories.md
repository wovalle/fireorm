# Custom Repositories

By default, fireorm repositories have methods to create, read, update and delete documents, but what if we want to add extra data access logic? Fireorm supports Custom Repositories. A Custom Repository is a class that extends BaseRepository<T>(where T is a model) and is decorated with fireorm’s [CustomRepository](Globals.md#CustomRepository) decorator.

```typescript
import {
  BaseFirestoreRepository,
  CustomRepository,
  getRepository,
} from 'fireorm';
import Band from './models/Band';

@CustomRepository(Band)
class CustomBandRepository extends BaseFirestoreRepository<Band> {
  async getProgressiveRockBands(): Promise<Band[]> {
    return this.whereArrayContains('genres', 'progressive-rock').find();
  }
}

const bandRepository = getRepository(Band) as CustomBandRepository;
const bands = await bandRepository.getProgressiveRockBands();
```

Now, `getRepository(Band)` will return the custom repository for Band with the _getProgressiveRockBands_ method. If a model doesn’t have a custom repository, the base repository will be returned. Fireorm also provides `getCustomRepository` and `getBaseRepository` helpers if we don’t want the default behavior.

## Casting

As you can see, we have to cast the repository returned by the `getRepository` as the custom repository we want to use (_CustomBandRepository_).
