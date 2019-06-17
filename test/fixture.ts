export class Album {
  id: string;
  name: string;
  releaseDate: Date;
  comment?: string;
}
export class BandEntity {
  id: string;
  name: string;
  formationYear: number;
  lastShow: Date;
  genres: Array<string>;
  albums: Array<Album>;
}

const getCollectionBoilerplate = (entity: string, hash: object) => ({
  __collection__: {
    [entity]: {
      __doc__: hash,
    },
  },
});

const getColFixture = () => {
  const bands = new Array<BandEntity>();

  bands.push({
    id: 'porcupine-tree',
    name: 'Porcupine Tree',
    formationYear: 1987,
    lastShow: new Date('2010-10-14'),
    genres: ['psychedelic-rock', 'progressive-rock', 'progressive-metal'],
    albums: [
      {
        id: 'lightbulb-sun',
        name: 'Lightbulb Sun',
        releaseDate: new Date('2000-05-22'),
      },
      {
        id: 'in-absentia',
        name: 'In Absentia',
        releaseDate: new Date('2002-09-24'),
      },
      { id: 'deadwing', name: 'Deadwing', releaseDate: new Date('2005-03-25') },
      {
        id: 'fear-blank-planet',
        name: 'Fear of a Blank Planet',
        releaseDate: new Date('2007-04-16'),
      },
    ],
  });

  bands.push({
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
      },
      {
        id: 'wish-you-were-here',
        name: 'Wish You Were Here',
        releaseDate: new Date('1975-09-12'),
      },
      { id: 'animals', name: 'Animals', releaseDate: new Date('1977-01-23') },
      { id: 'the-wall', name: 'The Wall', releaseDate: new Date('1979-11-30') },
    ],
  });

  bands.push({
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
      },
      {
        id: 'by-the-way',
        name: 'By the Way',
        releaseDate: new Date('2002-07-09'),
      },
      {
        id: 'stadium-arcadium',
        name: 'Stadium Arcadium',
        releaseDate: new Date('2006-05-09'),
      },
    ],
  });

  const objectifyList = (arr: Array<any>, cb) =>
    arr.reduce((acc, cur) => ({ ...acc, [cur.id]: cb(cur) }), {});

  return objectifyList(bands, ({ albums, ...rest }) => ({
    ...rest,
    ...getCollectionBoilerplate('albums', objectifyList(albums, a => a)),
  }));
};

export const getFixture = () =>
  getCollectionBoilerplate('bands', getColFixture());
