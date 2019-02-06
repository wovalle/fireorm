export class Album {
  id: string;
  name: string;
  year: number;
}
export class BandEntity {
  id: string;
  name: string;
  formationYear: number;
  genres: Array<string>;
  albums: Array<Album>;
}

const getColFixture = () => {
  const bands = new Array<BandEntity>();

  bands.push({
    id: 'porcupine-tree',
    name: 'Porcupine Tree',
    formationYear: 1987,
    genres: ['psychedelic-rock', 'progressive-rock', 'progressive-metal'],
    albums:[
      {id: 'lightbulb-sun', name: 'Lightbulb Sun', year: 2000},
      {id: 'in-absentia', name: 'In Absentia', year: 2002},
      {id: 'deadwing', name: 'Deadwing', year: 2005},
      {id: 'fear-blank-planet', name: 'Fear of a Blank Planet', year: 2007},
    ]
  })

  bands.push({
    id: 'pink-floyd',
    name: 'Pink Floyd',
    formationYear: 1965,
    genres: ['psychedelic-rock', 'progressive-rock', 'space-rock'],
    albums: [
      {id: 'dark-side-moon', name: 'The Dark Side of the Moon', year: 1973},
      {id: 'wish-you-were-here', name: 'Wish You Were Here', year: 1975},
      {id: 'animals', name: 'Animals', year: 1977},
      {id: 'the-wall', name: 'The Wall', year: 1979},
    ]
  })

  bands.push({
    id: 'red-hot-chili-peppers',
    name: 'Red Hot Chili Peppers',
    formationYear: 1983,
    genres: ['funk-rock', 'funk-metal', 'alternative-rock'],
    albums: [
      {id: 'californication', name: 'Californication', year: 1999},
      {id: 'by-the-way', name: 'By the Way', year: 2002},
      {id: 'stadium-arcadium', name: 'Stadium Arcadium', year: 2006},
    ]
  })

  const objectifyList = (arr: Array<any>, cb) =>
    arr.reduce((acc, cur) => ({...acc, [cur.id]: cb(cur) }), {})

  return objectifyList(bands, ({albums, ...rest}) => ({...rest, ...getCollectionBoilerplate('albums', objectifyList(albums, a=>a))}))
};

const getCollectionBoilerplate = (entity: string, hash: object) => ({
  __collection__: {
    [entity]: {
      __doc__: hash,
    },
  },
})

export const getFixture = () => getCollectionBoilerplate('bands', getColFixture());
