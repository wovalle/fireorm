# fireorm🔥

[![Build Status](https://travis-ci.com/wovalle/fireorm.svg?token=KsyisFHzgCusk2sapuJe&branch=master)](https://travis-ci.com/wovalle/fireorm)
[![NPM Version](https://img.shields.io/npm/v/fireorm.svg?style=flat)](https://www.npmjs.com/package/fireorm)
[![Typescript lang](https://img.shields.io/badge/Language-Typescript-Blue.svg)](https://www.typescriptlang.org)
[![License](https://img.shields.io/npm/l/fireorm.svg?style=flat)](https://www.npmjs.com/package/fireorm)

_:warning::heavy_exclamation_mark: Caution: This project is in **active** development. Documentation may not be totally up to date. APIs may change until stable_

Fireorm is a tiny wrapper on top of firebase-admin that makes life easier when dealing with a Firestore database. Fireorm tries to ease the development of apps that rely on Firestore at the database layer by abstracting the access layer providing and familiar repository pattern. It basically helps us not worrying about Firestore details and focusing in what matters: adding cool new features!

You can read more about the motivations and features of fireorm [on its introductory post](https://medium.com/p/ba7734644684).

## Usage

1. Install the npm package:

```bash
yarn add typeorm
```

2. Initialize your firestore application ([documentation](https://firebase.google.com/docs/firestore/quickstart#initialize)):

```typescript
import * as admin from 'firebase-admin';

const serviceAccount = require('../firestore.creds.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: `https://${serviceAccount.project_id}.firebaseio.com`,
});

const firestore = admin.firestore();
firestore.settings({
  timestampsInSnapshots: true,
});
```

3. Do cool stuff with fireorm!

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

const todoDocument = await todoRepository.create(todo); // Create todo

const mySuperTodoDocument = await todoRepository.findById(todoDocument.id); // Read todo

mySuperTodoDocument.done = true;
await todoRepository.update(mySuperTodoDocument); // Update todo

await todoRepository.delete(mySuperTodoDocument.id); // Delete todo
```

You can check the [API Documentation](https://wovalle.github.io/fireorm/) or a [tutorial](https://medium.com/p/ba7734644684).

## Development

#### Initial Setup

1.  Clone the project from github:
    ```
    git clone git@github.com:wovalle/fireorm.git
    ```
2.  Install the dependencies.
    ```
    yarn install
    ```

#### Testing

You can run the tests with the following command:

```
yarn test
```

Test files must follow the naming convention `*.test.ts` and run with [Mocha Test Runner](https://mochajs.org/).

#### Release a new version

- To release a new version to npm, first we have to create a new tag:

```bash
npm version [ major | minor | patch ] -m "Relasing version"
git push --follow-tags
```

- Then we can publish the package to npm registry:

```bash
npm publish
```

#### Update documentation

- Fireorm uses [typedoc](https://typedoc.org/) to automatically generate API documentation, to run it:

```bash
yarn build:documentation
```

#### Deploy documentation

- API documentation is hosted in [Github Pages](https://pages.github.com/), to deploy a new version:

```bash
yarn deploy:documentation
```

## Contributing

Have a bug or a feature request? Please search [the issues](https://github.com/wovalle/fireorm/issues) to prevent duplication. If you couldn't what you were looking for, [proceed to open a new one](https://github.com/wovalle/fireorm/issues/new). Pull requests are welcome but they must be accomp

# License

MIT © [Willy Ovalle](https://github.com/wovalle). See [LICENSE](https://github.com/wovalle/fireorm/blob/master/LICENSE) for details.
