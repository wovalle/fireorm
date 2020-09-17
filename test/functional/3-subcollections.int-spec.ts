import { Band as BandEntity, Album as AlbumEntity, getInitialData } from '../fixture';
import { getRepository, Collection, SubCollection, BaseFirestoreRepository } from '../../src';
import { getUniqueColName } from '../setup';

describe('Integration test: SubCollections', () => {
  class Album extends AlbumEntity {}

  @Collection(getUniqueColName('band-with-subcollections'))
  class FullBand extends BandEntity {
    @SubCollection(Album)
    albums: BaseFirestoreRepository<Album>;
  }

  let fullBandRepository: BaseFirestoreRepository<FullBand> = null;

  beforeEach(async () => {
    fullBandRepository = getRepository(FullBand);
    const seed = getInitialData().map(({ albums, ...band }) => ({
      band,
      albums,
    }));

    for (const s of seed) {
      const band = new FullBand();
      band.id = s.band.id;
      band.name = s.band.name;
      band.genres = s.band.genres;
      band.formationYear = s.band.formationYear;
      band.lastShow = s.band.lastShow;
      band.lastShowCoordinates = null;

      await fullBandRepository.create(band);

      const albums = s.albums.map(a => {
        const album = new Album();
        album.id = a.id;
        album.releaseDate = a.releaseDate;
        album.name = a.name;

        return album;
      });

      await Promise.all(albums.map(a => band.albums.create(a)));
    }
  });

  it('should do crud with subcollections', async () => {
    const rush = new FullBand();
    rush.id = 'rush';
    rush.name = 'Rush';
    rush.formationYear = 1968;
    rush.genres = ['progressive-rock', 'hard-rock', 'heavy-metal'];

    const repo = await fullBandRepository.create(rush);

    // Inserting some albums (subcollections)
    const secondAlbum = new Album();
    secondAlbum.id = 'fly-by-night';
    secondAlbum.name = 'Fly by Night';
    secondAlbum.releaseDate = new Date('1975-02-15');

    const fourthAlbum = new Album();
    fourthAlbum.id = '2112';
    fourthAlbum.name = '2112';
    fourthAlbum.releaseDate = new Date('1976-04-01');

    const eighthAlbum = new Album();
    eighthAlbum.id = 'moving-pictures';
    eighthAlbum.name = 'Moving Pictures';
    eighthAlbum.releaseDate = new Date('1982-02-12');

    const batch = repo.albums.createBatch();

    await rush.albums.create(secondAlbum);
    batch.create(fourthAlbum);
    batch.create(eighthAlbum);

    await batch.commit();

    // Retrieving albums before 1980
    const albumsBefore1980 = await rush.albums
      .whereLessThan('releaseDate', new Date('1980-01-01'))
      .find();

    expect(albumsBefore1980.length).toEqual(2);
    expect(albumsBefore1980[0].id).toEqual('fly-by-night');
    expect(albumsBefore1980[1].id).toEqual('2112');

    // Updating album
    const movingPictures = await rush.albums.findById('moving-pictures');
    movingPictures.releaseDate = new Date('1981-02-12');
    await rush.albums.update(movingPictures);
    const updated = await rush.albums.findById('moving-pictures');
    expect(updated.releaseDate).toEqual(movingPictures.releaseDate);

    // Deleting an album
    await rush.albums.delete('moving-pictures');
    const updatedAlbums = await rush.albums.find();
    expect(updatedAlbums.length).toEqual(2);

    // Updating parent collection
    rush.genres = rush.genres.slice(0, 2);
    await fullBandRepository.update(rush);
    const updatedRush = await fullBandRepository.findById('rush');
    expect(updatedRush.genres).toEqual(rush.genres);
  });
});
