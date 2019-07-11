import uuid from 'uuid';
import * as admin from 'firebase-admin';
import { Initialize } from '../src';
const serviceAccount = require('./firestore.creds.json');

const uniqueCollections: Array<String> = [];
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: `https://${serviceAccount.project_id}.firebaseio.com`,
});

const firestore = admin.firestore();
firestore.settings({
  timestampsInSnapshots: true,
});
Initialize(firestore);

after(() => {
  console.log('must delete uniqueCollections', uniqueCollections);
});

export const getUniqueColName = (col: string) => {
  const unique = `${col}#${uuid.v4()}`;
  uniqueCollections.push(unique);
  return unique;
};
