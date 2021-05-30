# fireorm🔥

[![NPM Version](https://img.shields.io/npm/v/fireorm.svg?style=flat)](https://www.npmjs.com/package/fireorm)
[![Build Status](https://travis-ci.com/wovalle/fireorm.svg?token=KsyisFHzgCusk2sapuJe&branch=master)](https://travis-ci.com/wovalle/fireorm)
[![Typescript lang](https://img.shields.io/badge/Language-Typescript-Blue.svg)](https://www.typescriptlang.org)
[![All Contributors](https://img.shields.io/badge/all_contributors-7-orange.svg?style=flat-square)](#contributors)
[![License](https://img.shields.io/npm/l/fireorm.svg?style=flat)](https://www.npmjs.com/package/fireorm)
[![Gitter chat](https://badges.gitter.im/gitterHQ/gitter.png)](https://gitter.im/fireorm/community)

Fireorm is a tiny wrapper on top of firebase-admin that makes life easier when dealing with a Firestore database. Fireorm tries to ease the development of apps that rely on Firestore at the database layer by abstracting the access layer providing a familiar repository pattern. It basically helps us not worry about Firestore details and focus on what matters: adding cool new features!

You can read more about the motivations and features of fireorm [on its introductory post](https://medium.com/p/ba7734644684). Also, the [API documentation](https://wovalle.github.io/fireorm) is available.

## Usage

1.  Install the npm package:

```bash
yarn add fireorm reflect-metadata #or npm install fireorm reflect-metadata

# note: the reflect-metadata shim is required
```

2. [Initialize](https://firebase.google.com/docs/firestore/quickstart#initialize) your Firestore application:

```typescript
import * as admin from 'firebase-admin';
import * as fireorm from 'fireorm';

const serviceAccount = require('../firestore.creds.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: `https://${serviceAccount.project_id}.firebaseio.com`,
});

const firestore = admin.firestore();
fireorm.initialize(firestore);
```

3.  Create your Firestore models:

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

const todoRepository = getRepository(Todo);

const todo = new Todo();
todo.text = "Check fireorm's Github Repository";
todo.done = false;

const todoDocument = await todoRepository.create(todo); // Create todo
const mySuperTodoDocument = await todoRepository.findById(todoDocument.id); // Read todo
await todoRepository.update(mySuperTodoDocument); // Update todo
await todoRepository.delete(mySuperTodoDocument.id); // Delete todo
```

### Firebase Complex Data Types

Firestore has support for [complex data types](https://firebase.google.com/docs/firestore/manage-data/data-types) such as GeoPoint and Reference. Full handling of complex data types is [being handled in this issue](https://github.com/wovalle/fireorm/issues/58). Temporarily, fireorm will export [Class Transformer's @Type](https://github.com/typestack/class-transformer#working-with-nested-objects) decorator. It receives a lamda where you return the type you want to cast to. [See GeoPoint Example](https://github.com/wovalle/fireorm/blob/d8f79090b7006675f2cb5014bb5ca7a9dfbfa8c1/src/BaseFirestoreRepository.spec.ts#L471-L476).

#### Limitations

If you want to cast GeoPoints to your custom class, it must have `latitude: number` and `longitude: number` as public class fields. Hopefully this won't be a limitation in v1.

## Development

### Initial Setup

1.  Clone the project from github:

```bash
git clone git@github.com:wovalle/fireorm.git
```

2.  Install the dependencies:

```bash
yarn # npm install
```

### Testing

Fireorm has two types of tests:

- Unit tests: `yarn test # or npm test`
- Integration tests: `yarn test:integration # or npm test:integration`

To be able to run the integration tests you need to [create a Firebase service account](https://firebase.google.com/docs/admin/setup#initialize_the_sdk) and declare some [environment variables](https://github.com/wovalle/fireorm/blob/master/test/setup.ts#L5-L13).

Test files must follow the naming convention `*.test.ts` and use [jest](https://jestjs.io/) as the test runner.

### Committing

This repo uses [Conventional Commits](https://www.conventionalcommits.org/) as the commit messages convention.

### Release a new version

This repo uses [Sematic Release](https://github.com/semantic-release/semantic-release) to automatically release new versions as soon as they land on master.

Commits must follow [Angular's Git Commit Guidelines](https://github.com/angular/angular.js/blob/master/DEVELOPERS.md#-git-commit-guidelines).

Supported commit types (taken from [here](https://github.com/angular/angular.js/blob/master/DEVELOPERS.md#type)):

- **feat:** A new feature
- **fix:** A bug fix
- **docs:** Documentation only changes
- **style:** Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
- **refactor:** A code change that neither fixes a bug nor adds a feature
- **perf:** A code change that improves performance
- **test:** Adding missing or correcting existing tests
- **chore:** Changes to the build process or auxiliary tools and libraries such as documentation generation

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

- To deploy the documentation:

```bash
yarn deploy:doc # or npm deploy:doc
```

</details>

### Documentation

- Fireorm uses [typedoc](https://typedoc.org/) to automatically build the API documentation, to generate it:

```bash
yarn build:doc # or npm build:doc
```

Documentation is automatically deployed on each commit to master and is hosted in [Github Pages](https://pages.github.com/) in this [link](https://wovalle.github.io/fireorm).

## Contributing

Have a bug or a feature request? Please search [the issues](https://github.com/wovalle/fireorm/issues) to prevent duplication. If you couldn't find what you were looking for, [proceed to open a new one](https://github.com/wovalle/fireorm/issues/new). Pull requests are welcome!

## Contributors

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="http://twitter.com/wovalle"><img src="https://avatars0.githubusercontent.com/u/7854116?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Willy Ovalle</b></sub></a><br /><a href="https://github.com/wovalle/fireorm/commits?author=wovalle" title="Code">💻</a> <a href="https://github.com/wovalle/fireorm/commits?author=wovalle" title="Documentation">📖</a> <a href="#example-wovalle" title="Examples">💡</a> <a href="#ideas-wovalle" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/wovalle/fireorm/pulls?q=is%3Apr+reviewed-by%3Awovalle" title="Reviewed Pull Requests">👀</a> <a href="https://github.com/wovalle/fireorm/commits?author=wovalle" title="Tests">⚠️</a></td>
    <td align="center"><a href="https://github.com/mamodom"><img src="https://avatars3.githubusercontent.com/u/5097424?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Maximo Dominguez</b></sub></a><br /><a href="#ideas-mamodom" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/wovalle/fireorm/commits?author=mamodom" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/jonesnc"><img src="https://avatars0.githubusercontent.com/u/1293145?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Nathan Jones</b></sub></a><br /><a href="https://github.com/wovalle/fireorm/commits?author=jonesnc" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/skalashnyk"><img src="https://avatars3.githubusercontent.com/u/18640514?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Sergii Kalashnyk</b></sub></a><br /><a href="https://github.com/wovalle/fireorm/commits?author=skalashnyk" title="Code">💻</a></td>
    <td align="center"><a href="http://skneko.moe/"><img src="https://avatars1.githubusercontent.com/u/13376606?v=4?s=100" width="100px;" alt=""/><br /><sub><b>SaltyKawaiiNeko</b></sub></a><br /><a href="https://github.com/wovalle/fireorm/commits?author=skneko" title="Code">💻</a> <a href="#ideas-skneko" title="Ideas, Planning, & Feedback">🤔</a></td>
    <td align="center"><a href="https://github.com/z-hirschtritt"><img src="https://avatars1.githubusercontent.com/u/35265735?v=4?s=100" width="100px;" alt=""/><br /><sub><b>z-hirschtritt</b></sub></a><br /><a href="https://github.com/wovalle/fireorm/commits?author=z-hirschtritt" title="Code">💻</a> <a href="#ideas-z-hirschtritt" title="Ideas, Planning, & Feedback">🤔</a></td>
    <td align="center"><a href="http://joemck.ie/"><img src="https://avatars1.githubusercontent.com/u/4980618?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Joe McKie</b></sub></a><br /><a href="https://github.com/wovalle/fireorm/commits?author=joemckie" title="Code">💻</a> <a href="#ideas-joemckie" title="Ideas, Planning, & Feedback">🤔</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://www.smddzcy.com/"><img src="https://avatars3.githubusercontent.com/u/13895224?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Samed Düzçay</b></sub></a><br /><a href="https://github.com/wovalle/fireorm/commits?author=smddzcy" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/stefdelec"><img src="https://avatars1.githubusercontent.com/u/12082478?v=4?s=100" width="100px;" alt=""/><br /><sub><b>stefdelec</b></sub></a><br /><a href="https://github.com/wovalle/fireorm/commits?author=stefdelec" title="Code">💻</a></td>
    <td align="center"><a href="http://www.innvia.com"><img src="https://avatars0.githubusercontent.com/u/35846271?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Łukasz Kuciel</b></sub></a><br /><a href="https://github.com/wovalle/fireorm/commits?author=LukaszKuciel" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/Fame513"><img src="https://avatars1.githubusercontent.com/u/2944505?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Yaroslav Nekryach</b></sub></a><br /><a href="https://github.com/wovalle/fireorm/commits?author=Fame513" title="Code">💻</a></td>
    <td align="center"><a href="https://www.linkedin.com/in/dmytro-nikitiuk/"><img src="https://avatars0.githubusercontent.com/u/40293865?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Dmytro Nikitiuk</b></sub></a><br /><a href="https://github.com/wovalle/fireorm/commits?author=tomorroN" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/JingWangTW"><img src="https://avatars0.githubusercontent.com/u/20182367?v=4?s=100" width="100px;" alt=""/><br /><sub><b>JingWangTW</b></sub></a><br /><a href="https://github.com/wovalle/fireorm/commits?author=JingWangTW" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/rinkstiekema"><img src="https://avatars.githubusercontent.com/u/5337711?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Rink Stiekema</b></sub></a><br /><a href="https://github.com/wovalle/fireorm/commits?author=rinkstiekema" title="Code">💻</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/danieleisenhardt"><img src="https://avatars.githubusercontent.com/u/2325519?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Daniel</b></sub></a><br /><a href="https://github.com/wovalle/fireorm/commits?author=danieleisenhardt" title="Code">💻</a></td>
    <td align="center"><a href="https://zabreznik.net"><img src="https://avatars.githubusercontent.com/u/1311249?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Marko Zabreznik</b></sub></a><br /><a href="https://github.com/wovalle/fireorm/commits?author=MarZab" title="Code">💻</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!

## License

MIT © [Willy Ovalle](https://github.com/wovalle). See [LICENSE](https://github.com/wovalle/fireorm/blob/master/LICENSE) for details.
