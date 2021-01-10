import * as admin from 'firebase-admin';
import { initialize } from '../src';

console.log('Running Integration Test Setup');

const serviceAccount = {
  projectId: process.env.FIRESTORE_PROJECT_ID,
  databaseUrl: process.env.FIREBASE_DATABASE_URL,
  privateKey: Buffer.from(process.env.FIRESTORE_PRIVATE_KEY_BASE_64, 'base64').toString('ascii'),
  clientEmail: process.env.FIRESTORE_CLIENT_EMAIL,
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: serviceAccount.databaseUrl,
});

const firestore = admin.firestore();
// To understand this, see 5-document-references.spec.ts
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(global as any).firestoreRef = firestore;

const uniqueCollections = [];
jest.setTimeout(10000); // 10 seconds

beforeEach(() => {
  initialize(firestore);
  expect.hasAssertions();
});

afterAll(async () => {
  console.info('Deleting collections', uniqueCollections);
  const batch = firestore.batch();

  if (process.env.FIRESTORE_DELETE_ALL_COLLECTIONS) {
    const cols = await firestore.listCollections();
    for (const col of cols.map(c => c.id)) {
      const docs = await firestore.collection(col).listDocuments();
      docs.forEach(d => batch.delete(d));
    }
  } else {
    for (const uc of uniqueCollections) {
      const docs = await firestore.collection(uc).listDocuments();

      for (const doc of docs) {
        const albums = await doc.collection('albums').listDocuments();
        albums.forEach(a => batch.delete(a));
        batch.delete(doc);
      }
    }
  }

  await batch.commit();
});

export const getUniqueColName = (col: string) => {
  const unique = `${col}#${new Date().getTime()}`;
  uniqueCollections.push(unique);
  console.log(`Now using collection: ${unique}`);
  return unique;
};
