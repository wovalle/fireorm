# SubCollections

In the [core concepts](CORE_CONCEPTS.md) we learned that in Firestore we store data in _[Documents](https://firebase.google.com/docs/firestore/data-model#documents)_ and they are organized into \_[Collections](https://firebase.google.com/docs/firestore/data-model#collections). But in Firestore you can also add collections inside documents, they are called [Subcollections](https://firebase.google.com/docs/firestore/data-model#subcollections).

To represent a SubCollection in our code, we'll make use of fireorm's [SubCollection](Globals.md#SubCollection) decorator.
For example, let’s create an Albums model and add it as a Subcollection of Band

```typescript
import { Collection, SubCollection, ISubCollection } from 'fireorm';

class Album {
  id: string;
  name: string;
  year: number;
}

@Collection()
export class Band {
  id: string;
  name: string;
  formationYear: number;
  genres: Array<string>;

  @SubCollection(Album)
  albums?: ISubCollection<Album>;
}
```

In this case we created a model called Album to store each album information: a unique id (remember, models must have an id by design!), name and year. Once the model is created, we add a _albums_ property to the existing Band model and decorate it using fireorm’s [SubCollection](Globals.md#SubCollection) decorator passing Album model as the first parameter.

Notice how we didn't add the [Collection](Globals.md#Collection) Decorator to the Album class (we wanted it to be a SubCollection, not a Collection!) but added the [SubCollection](Globals.md#SubCollection) inside Band model.

By default, fireorm will name the SubCollections with the plural form of the model name that was passed as first parameter (in this case, it will be named `Albums`). If you want you use your own name, you can pass an string as the second parameter of the SubCollection Decorator.

```typescript
@SubCollection(Album, 'TheAlbums')
```
