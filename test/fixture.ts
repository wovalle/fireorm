export class Coordinates {
  latitude: number;
  longitude: number;
}
export class Album {
  id: string;
  name: string;
  releaseDate: Date;
  comment?: string;
}

export class Band {
  id: string;
  name: string;
  formationYear: number;
  lastShow: Date;
  lastShowCoordinates?: Coordinates;
  genres: Array<string>;
}

export class BandMembers {
  id: string;
  bandId: string;
  name: string;
  from: Date;
  to: Date;
}

export class Label {
  id: string;
  bandId: string;
  name: string;
  from: Date;
  to: Date;
}

export const getInitialBandData = () => {
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
        },
        {
          id: 'in-absentia',
          name: 'In Absentia',
          releaseDate: new Date('2002-09-24'),
        },
        {
          id: 'deadwing',
          name: 'Deadwing',
          releaseDate: new Date('2005-03-25'),
        },
        {
          id: 'fear-blank-planet',
          name: 'Fear of a Blank Planet',
          releaseDate: new Date('2007-04-16'),
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
        },
        {
          id: 'wish-you-were-here',
          name: 'Wish You Were Here',
          releaseDate: new Date('1975-09-12'),
        },
        { id: 'animals', name: 'Animals', releaseDate: new Date('1977-01-23') },
        {
          id: 'the-wall',
          name: 'The Wall',
          releaseDate: new Date('1979-11-30'),
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
    },
  ];
};

export const getInitialBandMemberData = () => {
  return [
    {
      id: '1',
      bandId: 'porcupine-tree',
      name: 'Steven Wilson',
      from: new Date('1987-01-01'),
      to: null,
    },
    {
      id: '2',
      bandId: 'porcupine-tree',
      name: 'Richard Barbieri',
      from: new Date('1987-01-01'),
      to: null,
    },
    {
      id: '3',
      bandId: 'porcupine-tree',
      name: 'Chris Maitland',
      from: new Date('1987-01-01'),
      to: new Date('2002-02-01'),
    },
    {
      id: '4',
      bandId: 'porcupine-tree',
      name: 'Colin Edwins',
      from: new Date('1987-01-01'),
      to: null,
    },
    {
      id: '4',
      bandId: 'porcupine-tree',
      name: 'Gavin Harrison',
      from: new Date('2002-02-01'),
      to: null,
    },
  ];
};

export const getInitialBandLabelData = () => {
  return [
    {
      id: '1',
      bandId: 'porcupine-tree',
      name: 'Delerium',
      from: new Date('1991-01-01'),
      to: new Date('1997-10-01'),
    },
    {
      id: '2',
      bandId: 'porcupine-tree',
      name: 'Snapper',
      from: new Date('1999-03-01'),
      to: new Date('2001-04-01'),
    },
    {
      id: '3',
      bandId: 'porcupine-tree',
      name: 'Lava Records',
      from: new Date('2001-04-02'),
      to: new Date('2006-07-31'),
    },
    {
      id: '4',
      bandId: 'porcupine-tree',
      name: 'Roadrunner Records UK',
      from: new Date('2006-08-01'),
      to: null,
    },
    {
      id: '5',
      bandId: 'red-hot-chilli-peppers',
      name: 'EMI America',
      from: new Date('1983-11-01'),
      to: null,
    },
    {
      id: '6',
      bandId: 'red-hot-chilli-peppers',
      name: 'Warner Bros. Records',
      from: new Date('1990-05-01'),
      to: null,
    },
  ];
};

type ICollectionBoilerplate = [string, object];

const getCollectionBoilerplate = (colBoilerplate: ICollectionBoilerplate[]) => {
  return {
    __collection__: {
      ...colBoilerplate.reduce((acc, [colName, colData]) => {
        acc[colName] = {
          __doc__: colData,
        };
        return acc;
      }, {}),
    },
  };
};

const objectifyList = (arr: Array<any>, cb = a => a) =>
  arr.reduce((acc, cur) => ({ ...acc, [cur.id]: cb(cur) }), {});

const getBandFixture = (): Band[] => {
  const initialData = getInitialBandData();

  return objectifyList(initialData, ({ albums = [], ...rest }) => ({
    ...rest,
    ...getCollectionBoilerplate([['albums', objectifyList(albums)]]),
  }));
};

const getBandMembersFixture = (): BandMembers[] => {
  return objectifyList(getInitialBandMemberData());
};

const getBandLabelsFixture = (): Label[] => {
  return objectifyList(getInitialBandLabelData());
};

export const getFixture = () =>
  getCollectionBoilerplate([
    ['bands', getBandFixture()],
    ['members', getBandMembersFixture()],
    ['labels', getBandLabelsFixture()],
  ]);
