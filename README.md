# fireorm🔥
[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors)

[![Build Status](https://travis-ci.com/wovalle/fireorm.svg?token=KsyisFHzgCusk2sapuJe&branch=master)](https://travis-ci.com/wovalle/fireorm)
[![NPM Version](https://img.shields.io/npm/v/fireorm.svg?style=flat)](https://www.npmjs.com/package/fireorm)
[![Typescript lang](https://img.shields.io/badge/Language-Typescript-Blue.svg)](https://www.typescriptlang.org)
[![License](https://img.shields.io/npm/l/fireorm.svg?style=flat)](https://www.npmjs.com/package/fireorm)

_:warning::heavy_exclamation_mark: Caution: This project is in **active** development. Documentation may not be totally up to date. APIs may change until 1.0._

Fireorm is a tiny wrapper on top of firebase-admin that makes life easier when dealing with a Firestore database. Fireorm tries to ease the development of apps that rely on Firestore at the database layer by abstracting the access layer providing and familiar repository pattern. It basically helps us not worrying about Firestore details and focusing in what matters: adding cool new features!

You can read more about the motivations and features of fireorm [on its introductory post](https://medium.com/p/ba7734644684). Also, the [API documentation](https://wovalle.github.io/fireorm) is available.

## Usage

1. Install the npm package:

```bash
yarn add typeorm  #or npm install typeorm
```

2. [Initialize](https://firebase.google.com/docs/firestore/quickstart#initialize) your firestore application:

```typescript
import * as admin from 'firebase-admin';
import * as fireorm from 'fireorm';

const serviceAccount = require('../firestore.creds.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: `https://${serviceAccount.project_id}.firebaseio.com`,
});

const firestore = admin.firestore();
firestore.settings({
  timestampsInSnapshots: true,
});
fireorm.Initialize(firestore);
```

3. Create your firestore models!

```typescript
import { Collection } from 'fireorm';

@Collection()
class Todo {
  id: string;
  text: string;
  done: Boolean;
}
```

4. Do cool stuff with fireorm!

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
await todoRepository.update(mySuperTodoDocument); // Update todo
await todoRepository.delete(mySuperTodoDocument.id); // Delete todo
```

## Development

#### Initial Setup

1.  Clone the project from github:

```bash
git clone git@github.com:wovalle/fireorm.git
```

2.  Install the dependencies.

```bash
yarn install # npm install
```

#### Testing

You can run the tests with the following command:

```bash
yarn test # or npm test
```

Test files must follow the naming convention `*.test.ts` and use [mocha](https://mochajs.org/) as the test runner.

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

- Fireorm uses [typedoc](https://typedoc.org/) to automatically build the API documentation, to generate it:

```bash
yarn build:documentation # or npm build:documentation
```

#### Deploy documentation

- API documentation is hosted in [Github Pages](https://pages.github.com/), to deploy a new version:

```bash
yarn deploy:documentation # or npm deploy:documentation
```

## Contributing

Have a bug or a feature request? Please search [the issues](https://github.com/wovalle/fireorm/issues) to prevent duplication. If you couldn't what you were looking for, [proceed to open a new one](https://github.com/wovalle/fireorm/issues/new). Pull requests are welcome but they must be accomp

# License

MIT © [Willy Ovalle](https://github.com/wovalle). See [LICENSE](https://github.com/wovalle/fireorm/blob/master/LICENSE) for details.

## Contributors

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
<table><tr><td align="center"><a href="https://github.com/jonesnc"><img src="https://avatars0.githubusercontent.com/u/1293145?v=4" width="100px;" alt="Nathan Jones"/><br /><sub><b>Nathan Jones</b></sub></a><br /><a href="https://github.com/wovalle/fireorm/commits?author=jonesnc" title="Code">💻</a></td></tr></table>

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!