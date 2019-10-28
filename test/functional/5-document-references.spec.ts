import { getRepository, Collection } from '../../src';
import { Band as BandEntity } from '../fixture';
import { expect } from 'chai';
import { getUniqueColName } from '../setup';
import { DocumentReference, Firestore } from '@google-cloud/firestore';

describe('Integration test: Using Document References', () => {
  const colName = getUniqueColName('document-references');
  @Collection(colName)
  class Band extends BandEntity {
    relatedBands?: DocumentReference[];
  }

  const bandRepository = getRepository(Band);

  // TODO: document this hack
  const firestore = (global as any).firestoreRef as Firestore;

  it('should work with document references', async () => {
    const pt = new Band();
    pt.id = 'porcupine-tree';
    pt.name = 'Porcupine Tree';
    pt.formationYear = 1987;
    pt.genres = ['psychedelic-rock', 'progressive-rock', 'progressive-metal'];

    await bandRepository.create(pt);
    const ptRef = firestore.collection(colName).doc(pt.id);

    const sw = new Band();
    sw.name = 'Steven Wilson';
    sw.formationYear = 1987;
    sw.genres = ['progressive-rock', 'progressive-metal', 'psychedelic-rock'];
    sw.relatedBands = [ptRef];

    // Is able to store documents with references
    await bandRepository.create(sw);

    // Is able to retrieve documents with references
    const swFromDb = await bandRepository
      .whereEqualTo(b => b.name, 'Steven Wilson')
      .findOne();

    expect(swFromDb.formationYear).to.eql(1987);

    // Is able to filter documents by references
    const band = await bandRepository
      .whereArrayContains(b => b.relatedBands, ptRef)
      .find();

    expect(band.length).to.eql(1);
    expect(band[0].name).to.eql('Steven Wilson');
  });
});
