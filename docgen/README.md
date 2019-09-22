# fireorm🔥

Fireorm is a tiny wrapper on top of [firebase-admin](https://www.npmjs.com/package/firebase-admin) that makes life easier when dealing with a Firestore database. Fireorm tries to ease the development of apps that rely on Firestore at the database layer by abstracting the access layer providing and familiar repository pattern. It basically helps us not worrying about Firestore details and focusing in what matters: adding cool new features! 🕺🕺

You can read more about the motivations and features of fireorm [on its introductory post](https://medium.com/p/ba7734644684). Also, the [API documentation](https://wovalle.github.io/fireorm) is available.

## Installation

Fireorm is available as a package on [NPM](https://npmjs.com) for use with a module bundler or in a Node application:

# TODO: Talk about reflect-metadata

```bash
yarn add fireorm  #or npm install fireorm
```

## Initialization

[Initialize](https://firebase.google.com/docs/firestore/quickstart#initialize) your firestore application:

```typescript
import * as admin from 'firebase-admin';
import * as fireorm from 'fireorm';

const serviceAccount = require('../firestore.creds.json');
const dbUrl = `https://${serviceAccount.project_id}.firebaseio.com`;

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: dbUrl,
});

const firestore = admin.firestore();

fireorm.Initialize(firestore);
```

First we initialize the firestore database from [firebase-admin](https://firebase.google.com/docs/admin/setup#initialize_the_sdk) and pass some credentials. Then we initialize fireorm with the firestore instance. Now we can start using fireorm!

## Do stuff!

Write your application using fireorm!

```typescript
import { Collection, getRepository } from 'fireorm';

@Collection()
class Todo {
  id: string;
  text: string;
  done: Boolean;
}

const todoRepository = getRepository(Todo, firestore);

const todo = new Todo();
todo.text = "Check fireorm's Github Repository";
todo.done = false;

await todoRepository.create(todo);

const myTodoDoc = await todoRepository.findById(todo.id);
myTodoDoc.done = true;
await todoRepository.create(myTodoDoc);

console.log(`Completed task: ${myTodoDoc.text}`);
```
