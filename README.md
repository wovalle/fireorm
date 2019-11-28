# fireorm🔥

[![NPM Version](https://img.shields.io/npm/v/fireorm.svg?style=flat)](https://www.npmjs.com/package/fireorm)
[![Build Status](https://travis-ci.com/wovalle/fireorm.svg?token=KsyisFHzgCusk2sapuJe&branch=master)](https://travis-ci.com/wovalle/fireorm)
[![Typescript lang](https://img.shields.io/badge/Language-Typescript-Blue.svg)](https://www.typescriptlang.org)
[![All Contributors](https://img.shields.io/badge/all_contributors-4-orange.svg?style=flat-square)](#contributors)
[![License](https://img.shields.io/npm/l/fireorm.svg?style=flat)](https://www.npmjs.com/package/fireorm)
[![Gitter chat](https://badges.gitter.im/gitterHQ/gitter.png)](https://gitter.im/fireorm/community)

Fireorm is a tiny wrapper on top of firebase-admin that makes life easier when dealing with a Firestore database. Fireorm tries to ease the development of apps that rely on Firestore at the database layer by abstracting the access layer providing and familiar repository pattern. It basically helps us not worrying about Firestore details and focusing in what matters: adding cool new features!

You can read more about the motivations and features of fireorm [on its introductory post](https://medium.com/p/ba7734644684). Also, the [API documentation](https://wovalle.github.io/fireorm) is available.

## Usage

1.  Install the npm package:

```bash
yarn add fireorm reflect-metadata #or npm install fireorm reflect-metadata

# note: reflect-metadata shim is required
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

3.  Create your firestore models!

```typescript
import { Collection } from 'fireorm';

@Collection()
class Todo {
  id: string;
  text: string;
  done: Boolean;
}
```

4.  Do cool stuff with fireorm!

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

### Firebase Complex Data Types

Firestore has support for [complex data types](https://firebase.google.com/docs/firestore/manage-data/data-types) such as GeoPoint and Reference. Full handling of complex data types is [being handled in this issue](https://github.com/wovalle/fireorm/issues/58). Temporarily, Fireorm will export [Class Transformer's @Type](https://github.com/typestack/class-transformer#working-with-nested-objects) decorator. It receives a lamda where you have to return the type you want to cast to. [See GeoPoint Example](https://github.com/wovalle/fireorm/blob/master/src/BaseFirestoreRepository.spec.ts#L338-L344).

#### Limitations

If you want to cast GeoPoints to your custom class, it must have `latitude: number` and `longitude: number` as public class fields. Hopefully this won't be a limitation in v1.

## Development

### Initial Setup

1.  Clone the project from github:

```bash
git clone git@github.com:wovalle/fireorm.git
```

2.  Install the dependencies.

```bash
yarn # npm install
```

### Testing

Fireorm has two types of tests:

- Unit tests: `yarn test # or npm test`
- Integration tests: `yarn test:integration # or npm test:integration`

To be able to run the integration tests you'll need to [create a firebase service account](https://firebase.google.com/docs/admin/setup#initialize_the_sdk) and declare some [environment variables](https://github.com/wovalle/fireorm/blob/master/test/setup.ts#L5-L13).

Test files must follow the naming convention `*.test.ts` and use [mocha](https://mochajs.org/) as the test runner.

### Committing

This repo uses [Conventional Commits](https://www.conventionalcommits.org/) as the commit messages convention.

### Release a new version

This repo uses [Sematic Release](https://github.com/semantic-release/semantic-release) to automatically release new versions as soon as they land on master.

<details>
  <summary>Manual Release</summary>
  If, by any reason, a manual release must be done, these are the instructions:

- To release a new version to npm, first we have to create a new tag:

```bash
npm version [ major | minor | patch ] -m "Relasing version"
git push --follow-tags
```

- Then we can publish the package to npm registry:

```bash
npm publish
```

- To deploy the documentation

```bash
yarn deploy:documentation # or npm deploy:documentation
```

</details>

### Documentation

- Fireorm uses [typedoc](https://typedoc.org/) to automatically build the API documentation, to generate it:

```bash
yarn build:documentation # or npm build:documentation
```

Documentation is automatically deployed on each commit to master and is hosted in [Github Pages](https://pages.github.com/) in this [link](https://wovalle.github.io/fireorm).

## Contributing

Have a bug or a feature request? Please search [the issues](https://github.com/wovalle/fireorm/issues) to prevent duplication. If you couldn't what you were looking for, [proceed to open a new one](https://github.com/wovalle/fireorm/issues/new). Pull requests are welcome!

## Contributors

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
<table><tr><td align="center"><a href="http://twitter.com/wovalle"><img src="https://avatars0.githubusercontent.com/u/7854116?v=4" width="100px;" alt="Willy Ovalle"/><br /><sub><b>Willy Ovalle</b></sub></a><br /><a href="https://github.com/wovalle/fireorm/commits?author=wovalle" title="Code">💻</a> <a href="https://github.com/wovalle/fireorm/commits?author=wovalle" title="Documentation">📖</a> <a href="#example-wovalle" title="Examples">💡</a> <a href="#ideas-wovalle" title="Ideas, Planning, & Feedback">🤔</a> <a href="#review-wovalle" title="Reviewed Pull Requests">👀</a> <a href="https://github.com/wovalle/fireorm/commits?author=wovalle" title="Tests">⚠️</a></td><td align="center"><a href="https://github.com/mamodom"><img src="https://avatars3.githubusercontent.com/u/5097424?v=4" width="100px;" alt="Maximo Dominguez"/><br /><sub><b>Maximo Dominguez</b></sub></a><br /><a href="#ideas-mamodom" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/wovalle/fireorm/commits?author=mamodom" title="Code">💻</a></td><td align="center"><a href="https://github.com/jonesnc"><img src="https://avatars0.githubusercontent.com/u/1293145?v=4" width="100px;" alt="Nathan Jones"/><br /><sub><b>Nathan Jones</b></sub></a><br /><a href="https://github.com/wovalle/fireorm/commits?author=jonesnc" title="Code">💻</a></td><td align="center"><a href="https://github.com/skalashnyk"><img src="https://avatars3.githubusercontent.com/u/18640514?v=4" width="100px;" alt="Sergii Kalashnyk"/><br /><sub><b>Sergii Kalashnyk</b></sub></a><br /><a href="https://github.com/wovalle/fireorm/commits?author=skalashnyk" title="Code">💻</a></td></tr></table>

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!

## License

MIT © [Willy Ovalle](https://github.com/wovalle). See [LICENSE](https://github.com/wovalle/fireorm/blob/master/LICENSE) for details.
