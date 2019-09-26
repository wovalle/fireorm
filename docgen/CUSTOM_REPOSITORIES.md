# Custom Repositories

By default, fireorm repositories have methods to create, read, update and delete documents, but what if we want to add extra data access logic? Fireorm supports Custom Repositories. A Custom Repository is a class that extends BaseRepository<T>(where T is a model) and is decorated with fireorm’s [CustomRepository](API.md#CustomRepositoryDecorator) decorator.

```typescript
import {
  BaseFirestoreRepository,
  CustomRepository,
  GetRepository,
} from 'fireorm';
import Band from './models/Band';

@CustomRepository(Band)
class CustomBandRepository extends BaseFirestoreRepository<Band> {
  async getProgressiveRockBands(): Promise<Band[]> {
    return this.whereArrayCointain('genres', 'progressive-rock').find();
  }
}

const bandRepository = GetRepository(Band) as CustomBandRepository;
const bands = await bandRepository.getProgressiveRockBands();
```

Now, `GetRepository(Band)` will return the custom repository for Band with the _getProgressiveRockBands_ method. If a model doesn’t have a custom repository, the base repository will be returned. Fireorm also provides `GetCustomRepository` and `GetBaseRepository` helpers if we don’t want the default behavior.

## Casting

As you can see, we have to cast the repository returned by the `GetRepository` as the custom repository we want to use (_CustomBandRepository_).
