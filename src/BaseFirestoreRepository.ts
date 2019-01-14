// tslint:disable-next-line:no-import-side-effect
import 'reflect-metadata';

import {
  IRepository,
  IFirestoreVal,
  IQueryBuilder,
  FirestoreCollectionType,
} from './types';

import {
  Firestore,
  DocumentSnapshot,
  CollectionReference,
} from '@google-cloud/firestore';

import QueryBuilder from './QueryBuilder';
import { getMetadataStorage } from './MetadataStorage';

export default class BaseFirestoreRepository<T extends { id: string }>
  implements IRepository<T>, IQueryBuilder<T> {
  // TODO: Ordering
  // TODO: pub/sub for realtime updates
  // TODO: limit
  // TODO: open transactions? (probably in uof)
  // TODO: colname = classname unless param is passed
  // TODO: @createdOnField, @updatedOnField
  // TODO: register repository in metadata
  // TODO: allow models with functions

  public collectionType: FirestoreCollectionType;
  private firestoreCollection: CollectionReference;

  constructor(db: Firestore, colName: string);
  constructor(
    db: Firestore,
    colName: string,
    docId: string,
    subColName: string
  );

  constructor(
    protected db: Firestore,
    protected colName: string,
    protected docId?: string,
    protected subColName?: string
  ) {
    if (this.docId) {
      this.collectionType = FirestoreCollectionType.subcollection;
      this.firestoreCollection = this.db
        .collection(this.colName)
        .doc(this.docId)
        .collection(this.subColName);
    } else {
      this.collectionType = FirestoreCollectionType.collection;
      this.firestoreCollection = this.db.collection(this.colName);
    }
  }

  private extractTFromDocSnap = (doc: DocumentSnapshot): T => {
    if (!doc.exists) {
      return null;
    }

    const entity = this.parseTimestamp(doc.data() as T);

    // TODO: This wont be required after implementing https://github.com/typestack/class-transformer
    entity.id = `${doc.id}`;

    //If you're a subcollection, you don't have to check for other subcollections
    // TODO: Write tests
    // TODO: remove subcollections when saving to db
    if (this.collectionType === FirestoreCollectionType.collection) {
      const collection = getMetadataStorage().collections.find(
        c => c.name === this.colName
      );

      if (!collection) {
        throw new Error(`There is no collection called ${this.colName}`);
      }

      const subcollections = getMetadataStorage().subCollections.filter(
        sc => sc.target === collection.target
      );

      subcollections.forEach(subCol => {
        // tslint:disable-next-line:no-shadowed-variable
        const T = subCol.entity;
        Object.assign(entity, {
          [subCol.name]: new BaseFirestoreRepository<T>(
            this.db,
            this.colName,
            doc.id,
            subCol.name
          ),
        });
      });
    }

    return entity;
  };

  private parseTimestamp = (obj: T): T => {
    Object.keys(obj).forEach(key => {
      if (!obj[key]) return;
      if (typeof obj[key] === 'object' && 'toDate' in obj[key]) {
        obj[key] = obj[key].toDate();
      } else if (typeof obj[key] === 'object') {
        this.parseTimestamp(obj[key]);
      }
    });

    return obj;
  };

  // TODO: have a smarter way to do this
  private toObject = (obj: T): Object => {
    return JSON.parse(JSON.stringify(obj));
  };

  findById(id: string): Promise<T> {
    return this.firestoreCollection
      .doc(id)
      .get()
      .then(this.extractTFromDocSnap);
  }

  async create(item: T): Promise<T> {
    // TODO: Double operation here. Should construct T myself with ref.id?
    // TODO: add tests

    if (item.id) {
      const found = await this.findById(`${item.id}`);
      if (found) {
        return Promise.reject(
          new Error('Trying to create an already existing document')
        );
      }
    }

    const doc = item.id
      ? this.firestoreCollection.doc(`${item.id}`)
      : this.firestoreCollection.doc();

    await doc.set(this.toObject(item));

    item.id = doc.id;

    return item;
  }

  async update(item: T): Promise<T> {
    // TODO: handle errors
    await this.firestoreCollection.doc(item.id).update(this.toObject(item));
    return item;
  }

  async delete(id: string): Promise<void> {
    // TODO: handle errors
    await this.firestoreCollection.doc(id).delete();
  }

  find(): Promise<T[]> {
    return new QueryBuilder<T>(this.firestoreCollection).find();
  }

  whereEqualTo(prop: keyof T, val: IFirestoreVal): QueryBuilder<T> {
    return new QueryBuilder<T>(this.firestoreCollection).whereEqualTo(
      prop,
      val
    );
  }

  whereGreaterThan(prop: keyof T, val: IFirestoreVal): QueryBuilder<T> {
    return new QueryBuilder<T>(this.firestoreCollection).whereGreaterThan(
      prop,
      val
    );
  }

  whereGreaterOrEqualThan(prop: keyof T, val: IFirestoreVal): QueryBuilder<T> {
    return new QueryBuilder<T>(
      this.firestoreCollection
    ).whereGreaterOrEqualThan(prop, val);
  }

  whereLessThan(prop: keyof T, val: IFirestoreVal): QueryBuilder<T> {
    return new QueryBuilder<T>(this.firestoreCollection).whereLessThan(
      prop,
      val
    );
  }

  whereLessOrEqualThan(prop: keyof T, val: IFirestoreVal): QueryBuilder<T> {
    return new QueryBuilder<T>(this.firestoreCollection).whereLessOrEqualThan(
      prop,
      val
    );
  }

  whereArrayCointain(prop: keyof T, val: IFirestoreVal): QueryBuilder<T> {
    return new QueryBuilder<T>(this.firestoreCollection).whereArrayCointain(
      prop,
      val
    );
  }
}

export function getRepository<T extends { id: string }>(
  entity: { new (): T },
  db: Firestore
) {
  const collection = getMetadataStorage().collections.find(
    c => c.target === entity
  );

  if (!collection) {
    throw new Error(`${entity.name} is not a valid collection.`);
  }

  return new BaseFirestoreRepository<T>(db, collection.name);
}
