import { IEntity } from '../src';
import { Serialize } from '../src/Decorators/Serialize';

export class Coordinates {
  latitude: number;
  longitude: number;
}

export class FirestoreDocumentReference {
  id: string;
  path: string;
}

export class AlbumImage {
  id: string;
  url: string;
}

export class Album {
  id: string;
  name: string;
  releaseDate: Date;
  comment?: string;
}

export class Website {
  url: string;
}

export class Agent {
  name: string;
  @Serialize(Website)
  website: Website;
}

export class Band {
  id: string;
  name: string;
  formationYear: number;
  lastShow: Date;
  lastShowCoordinates?: Coordinates;
  genres: Array<string>;
}

export const getInitialData = () => {
  return [
    {
      id: 'porcupine-tree',
      name: 'Porcupine Tree',
      formationYear: 1987,
      lastShow: new Date('2010-10-14'),
      lastShowCoordinates: { latitude: 51.5009088, longitude: -0.1795547 },
      genres: ['psychedelic-rock', 'progressive-rock', 'progressive-metal'],
      albums: [
        {
          id: 'lightbulb-sun',
          name: 'Lightbulb Sun',
          releaseDate: new Date('2000-05-22'),
          images: [
            {
              id: 'album-artwork',
              url: 'http://lorempixel.com/100/100',
            },
          ],
        },
        {
          id: 'in-absentia',
          name: 'In Absentia',
          releaseDate: new Date('2002-09-24'),
          images: [
            {
              id: 'album-artwork',
              url: 'http://lorempixel.com/100/100',
            },
          ],
        },
        {
          id: 'deadwing',
          name: 'Deadwing',
          releaseDate: new Date('2005-03-25'),
          images: [
            {
              id: 'album-artwork',
              url: 'http://lorempixel.com/100/100',
            },
          ],
        },
        {
          id: 'fear-blank-planet',
          name: 'Fear of a Blank Planet',
          releaseDate: new Date('2007-04-16'),
          images: [
            {
              id: 'album-artwork',
              url: 'http://lorempixel.com/100/100',
            },
            {
              id: 'album-cover',
              url: 'http://lorempixel.com/100/100',
            },
          ],
        },
      ],
    },
    {
      id: 'pink-floyd',
      name: 'Pink Floyd',
      formationYear: 1965,
      lastShow: new Date('1981-06-17'),
      genres: ['psychedelic-rock', 'progressive-rock', 'space-rock'],
      albums: [
        {
          id: 'dark-side-moon',
          name: 'The Dark Side of the Moon',
          releaseDate: new Date('1973-03-01'),
          images: [
            {
              id: 'album-artwork',
              url: 'http://lorempixel.com/100/100',
            },
          ],
        },
        {
          id: 'wish-you-were-here',
          name: 'Wish You Were Here',
          releaseDate: new Date('1975-09-12'),
          images: [
            {
              id: 'album-artwork',
              url: 'http://lorempixel.com/100/100',
            },
          ],
        },
        {
          id: 'animals',
          name: 'Animals',
          releaseDate: new Date('1977-01-23'),
          images: [
            {
              id: 'album-artwork',
              url: 'http://lorempixel.com/100/100',
            },
          ],
        },
        {
          id: 'the-wall',
          name: 'The Wall',
          releaseDate: new Date('1979-11-30'),
          images: [],
        },
      ],
    },
    {
      id: 'red-hot-chili-peppers',
      name: 'Red Hot Chili Peppers',
      formationYear: 1983,
      lastShow: null,
      genres: ['funk-rock', 'funk-metal', 'alternative-rock'],
      albums: [
        {
          id: 'californication',
          name: 'Californication',
          releaseDate: new Date('1999-06-08'),
          images: [
            {
              id: 'album-artwork',
              url: 'http://lorempixel.com/100/100',
            },
          ],
        },
        {
          id: 'by-the-way',
          name: 'By the Way',
          releaseDate: new Date('2002-07-09'),
          images: [
            {
              id: 'album-artwork',
              url: 'http://lorempixel.com/100/100',
            },
          ],
        },
        {
          id: 'stadium-arcadium',
          name: 'Stadium Arcadium',
          releaseDate: new Date('2006-05-09'),
          images: [
            {
              id: 'album-artwork',
              url: 'http://lorempixel.com/100/100',
            },
          ],
        },
      ],
    },
    {
      id: 'the-speckled-band',
      name: 'the Speckled Band',
      formationYear: 1892,
      lastShow: null,
      genres: [],
      albums: [],
      agents: [
        {
          name: 'Mycroft Holmes',
          website: {
            url: 'en.wikipedia.org/wiki/Mycroft_Holmes',
          },
        },
        {
          name: 'Arthur Conan Doyle',
          website: {
            url: 'en.wikipedia.org/wiki/Arthur_Conan_Doyle',
          },
        },
      ],
    },
  ];
};

const getCollectionBoilerplate = (entity: string, hash: Record<string, unknown>) => ({
  __collection__: {
    [entity]: {
      __doc__: hash,
    },
  },
});

export const getBandFixture = () => {
  const initialData = getInitialData();

  const objectifyList = (arr: Array<IEntity>, cb?) =>
    arr.reduce((acc, cur) => ({ ...acc, [cur.id]: cb ? cb(cur) : cur }), {});

  return objectifyList(initialData, ({ albums, ...rest }) => ({
    ...rest,
    ...getCollectionBoilerplate(
      'albums',
      objectifyList(albums, ({ images, ...album }) => ({
        ...album,
        ...getCollectionBoilerplate('images', objectifyList(images)),
      }))
    ),
  }));
};

export const getFixture = () => {
  return getCollectionBoilerplate('bands', getBandFixture());
};
