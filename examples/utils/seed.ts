import { Band, Album, FullBand } from './entities';

export const getInitialData = () => {
  return [
    {
      id: 'porcupine-tree',
      name: 'Porcupine Tree',
      formationYear: 1987,
      genres: ['psychedelic-rock', 'progressive-rock', 'progressive-metal'],
      albums: [
        { id: 'lightbulb-sun', name: 'Lightbulb Sun', year: 2000 },
        { id: 'in-absentia', name: 'In Absentia', year: 2002 },
        { id: 'deadwing', name: 'Deadwing', year: 2005 },
        { id: 'fear-blank-planet', name: 'Fear of a Blank Planet', year: 2007 },
      ],
    },
    {
      id: 'pink-floyd',
      name: 'Pink Floyd',
      formationYear: 1965,
      genres: ['psychedelic-rock', 'progressive-rock', 'space-rock'],
      albums: [
        { id: 'dark-side-moon', name: 'The Dark Side of the Moon', year: 1973 },
        { id: 'wish-you-were-here', name: 'Wish You Were Here', year: 1975 },
        { id: 'animals', name: 'Animals', year: 1977 },
        { id: 'the-wall', name: 'The Wall', year: 1979 },
      ],
    },
    {
      id: 'red-hot-chili-peppers',
      name: 'Red Hot Chili Peppers',
      formationYear: 1983,
      genres: ['funk-rock', 'funk-metal', 'alternative-rock'],
      albums: [
        { id: 'californication', name: 'Californication', year: 1999 },
        { id: 'by-the-way', name: 'By the Way', year: 2002 },
        { id: 'stadium-arcadium', name: 'Stadium Arcadium', year: 2006 },
      ],
    },
  ];
};

export const getInitialSeed = () => {
  return getInitialData()
    .map(({ albums, ...rest }) => ({ ...rest }))
    .map(b => {
      const entity = new Band();
      entity.id = b.id;
      entity.name = b.name;
      entity.genres = b.genres;
      entity.formationYear = b.formationYear;
      return entity;
    });
};

export const getInitialSeedWithSubcollections = () => {
  return getInitialData().map(({ albums, ...b }) => {
    const albumsEntities = albums.map(a => {
      const album = new Album();
      album.id = a.id;
      album.name = a.name;
      album.year = a.year;
      return album;
    });

    const band = new FullBand();
    band.id = b.id;
    band.name = b.name;
    band.genres = b.genres;
    band.formationYear = b.formationYear;

    return { band, albums: albumsEntities };
  });
};
