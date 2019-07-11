import uuid from 'uuid';
import * as admin from 'firebase-admin';
import { Initialize } from '../src';
const serviceAccount = require('./firestore.creds.json');

const uniqueCollections: Array<string> = [];
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: `https://${serviceAccount.project_id}.firebaseio.com`,
});

const firestore = admin.firestore();
firestore.settings({
  timestampsInSnapshots: true,
});
Initialize(firestore);

after(async () => {
  console.info('Deleting collections', uniqueCollections);

  const batch = firestore.batch();

  for (const uc of uniqueCollections) {
    const docs = await firestore.collection(uc).listDocuments();
    docs.forEach(d => batch.delete(d));
  }

  await batch.commit();
});

export const getUniqueColName = (col: string) => {
  const unique = `${col}#${uuid.v4()}`;
  uniqueCollections.push(unique);
  return unique;
};
