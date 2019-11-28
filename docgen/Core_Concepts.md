# Core Concepts

Fireorm is just a library to simplify the way we communicate with firestore. It does not implement the underlying communication with the database (it resorts to official sdk's for that, such as [firebase-admin](https://www.npmjs.com/package/firebase-admin)).

Given that fireorm is just

## Firestore

According to [it's homepage](https://cloud.google.com/firestore), Firestore is a fast, fully managed, serverless, cloud-native NoSQL document database that simplifies storing, syncing, and querying data for your mobile, web, and IoT apps at global scale.

In Firestore, data is stored in _Documents_ which are organized into _Collections_ that may also contain _SubCollections_.

To take full advantage of what fireorm's have to offer, is recommended that you are familiarized with [Firestore Data Model](https://firebase.google.com/docs/firestore/data-model).

## Fireorm Models

Models in fireorm are just a way to specify the shape that our data (or _Documents_) will have. Models are represented with [JavaScript Classes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes)!

For example, let's pretend that we want to store information about Rock Bands:the band name, formation year and array of genres. Our Model would look like this:

```typescript
class Band {
  id: string;
  name: string;
  formationYear: number;
  genres: Array<string>;
}
```

Wait, I only mentioned name, formationYear and genres in my original specification, why the model has a string property called `id`? Because of the way the data is stored in Firestore, **is required that every model contain a string property called id**. If you create a model without the id property (or with another data type such as Number or Symbol) fireorm won't work correctly.

### Fireorm Collections

Great, we have a model, but how can we ‘take’ our model and ‘store’ it the database? In Firestore we store data in _[Documents](https://firebase.google.com/docs/firestore/data-model#documents)_ and they are organized into _[Collections](https://firebase.google.com/docs/firestore/data-model#collections)_. To represent a Collection in our code, we'll use a fairly new JavaScript feature which Typescript let us use super easy: [Decorators](https://www.typescriptlang.org/docs/handbook/decorators.html).

To declare Collections we can just _decorate_ our model class with fireorm [Collection](globals.md#Collection) decorator and each instance of the model would act as a Firestore Document.

```typescript
import { Collection } from 'fireorm';

@Collection()
class Band {
  id: string;
  name: string;
  formationYear: number;
  genres: Array<string>;
}
```

See how we're importing the [Collection Decorator](globals.md#Collection) from fireorm and we're decorating our Band class with it. Internally, fireorm will treat each instance of Band as a Firestore Document.

Wait, Firestore Collections must have a name, what will be the name of that collection? By default, fireorm will name the collections with the plural form of the Model name, in this case `Bands`. If you want you use your own name, you can pass an string as the first parameter of the Decorator.

```typescript
@Collection('RockBands')
```

## Fireorm Repositories

One of my goals when developing this library was create a way to use the Repository Pattern with Firestore as easy as possible. We have our models, we have our collections, but how are we supposed to make CRUD operations? That’s what Repositories are for.

> In general, repositories are classes or components that encapsulate the logic required to access data sources. They centralize common data access functionality, providing better maintainability and decoupling the infrastructure or technology used to access databases from the domain model layer ([source](https://docs.microsoft.com/en-us/dotnet/architecture/microservices/microservice-ddd-cqrs-patterns/infrastructure-persistence-layer-design)).

Fireorm’s Repositories provide the necessary methods to create, retrieve, update and delete documents from our Firestore collections. To create a repository from a collection we can just call fireorm’s [getRepository](Globals.md#getRepository) method.

```typescript
import { Collection, getRepository } from 'fireorm';

@Collection()
class Band {
  id: string;
  name: string;
  formationYear: number;
  genres: Array<string>;
}

const bandRepository = getRepository(Band);
```

The variable `bandRepository` contains all the methods to interact with our `Band`. You can [retrieve](READ_DATA.md) [create](MANAGE_DATA.md#create), [update](MANAGE_DATA.md#update), [delete](MANAGE_DATA#delete) and do [complex queries](READ_DATA.md#ComplexQueries) over our Bands collection!
