import { Band, Album, FullBand } from './entities';
import { getInitialData } from '../../test/fixture';

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
      album.year = a.releaseDate.getFullYear();
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
