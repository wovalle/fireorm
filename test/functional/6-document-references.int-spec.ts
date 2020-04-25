import { getRepository, Collection, Type, BaseFirestoreRepository } from '../../src';
import { Band as BandEntity, FirestoreDocumentReference } from '../fixture';
import { getUniqueColName } from '../setup';
import { Firestore } from '@google-cloud/firestore';

describe('Integration test: Using Document References', () => {
  const colName = getUniqueColName('document-references');
  @Collection(colName)
  class Band extends BandEntity {
    @Type(() => FirestoreDocumentReference)
    relatedBand?: FirestoreDocumentReference;
  }

  let firestore: Firestore = null;
  let bandRepository: BaseFirestoreRepository<Band> = null;

  beforeEach(() => {
    bandRepository = getRepository(Band);

    /*
     * Yes, this is a hack.
     * Since the firestore initialization is being done in
     * setup.ts, I'm just storing the firestore instance
     * so I can use the sdk to store references.
     * After fireorm/issues/58 this will be removed
     */
    firestore = (global as any).firestoreRef as Firestore;
  });

  it('should work with document references', async () => {
    const pt = new Band();
    pt.id = 'porcupine-tree';
    pt.name = 'Porcupine Tree';
    pt.formationYear = 1987;
    pt.genres = ['psychedelic-rock', 'progressive-rock', 'progressive-metal'];

    await bandRepository.create(pt);
    const ptRef = firestore.collection(colName).doc(pt.id);

    const sw = new Band();
    sw.id = 'steven-wilson';
    sw.name = 'Steven Wilson';
    sw.formationYear = 1987;
    sw.genres = ['progressive-rock', 'progressive-metal', 'psychedelic-rock'];

    await bandRepository.create(sw);

    // Manually storing arbitrary reference
    await firestore.collection(colName).doc('steven-wilson').update({ relatedBand: ptRef });

    // Is able to retrieve documents with references
    const swFromDb = await bandRepository.whereEqualTo(b => b.name, 'Steven Wilson').findOne();

    expect(swFromDb.formationYear).toEqual(1987);

    // Is able to filter documents by references
    const band = await bandRepository.whereEqualTo(b => b.relatedBand, ptRef).find();

    expect(band.length).toEqual(1);
    expect(band[0].name).toEqual('Steven Wilson');
  });
});
