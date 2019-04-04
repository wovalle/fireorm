import { Initialize, GetRepository } from '../../src';
import * as admin from 'firebase-admin';
import { FullBand, Album } from '../utils/entities';

const serviceAccount = require('../firestore.creds.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: `https://${serviceAccount.project_id}.firebaseio.com`,
});

const firestore = admin.firestore();
firestore.settings({
  timestampsInSnapshots: true,
});
Initialize(firestore);

const fullBandRepository = GetRepository(FullBand);

const run = async () => {
  const band = new FullBand();
  band.id = 'rush';
  band.name = 'Rush';
  band.formationYear = 1968;
  band.genres = ['progressive-rock', 'hard-rock', 'heavy-metal'];

  const entity = await fullBandRepository.create(band);
  console.log(`Created rock band with id: ${entity.id}`);
  console.table(entity);

  const rush = await fullBandRepository.findById('rush');

  // Inserting some albums (subcollections)
  const secondAlbum = new Album();
  secondAlbum.id = 'fly-by-night';
  secondAlbum.name = 'Fly by Night';
  secondAlbum.year = 1975;

  const fourthAlbum = new Album();
  fourthAlbum.id = '2112';
  fourthAlbum.name = '2112';
  fourthAlbum.year = 1976;

  const eighthAlbum = new Album();
  eighthAlbum.id = 'moving-pictures';
  eighthAlbum.name = 'Moving Pictures';
  eighthAlbum.year = 1980;

  await rush.albums.create(secondAlbum);
  await rush.albums.create(fourthAlbum);
  await rush.albums.create(eighthAlbum);

  // Retrieving albums before 1980
  const albumsBefore1980 = await rush.albums.whereLessThan('year', 1980).find();
  console.log(`Albums before 1980: ${albumsBefore1980.map(a => a.name)}`);

  // Updating album
  const movingPictures = await rush.albums.findById('moving-pictures');
  movingPictures.year = 1981;
  const updated = await rush.albums.update(movingPictures);
  console.log(`Updated : ${updated.id}`);
};

run().catch(e => console.error(e));
