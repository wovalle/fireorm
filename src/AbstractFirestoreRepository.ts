import { plainToClass } from 'class-transformer';
import { DocumentSnapshot, QuerySnapshot } from '@google-cloud/firestore';
import { FirestoreCollectionType, IEntity } from './types';

import {
  getMetadataStorage,
  CollectionMetadata,
  SubCollectionMetadata,
} from './MetadataStorage';

import { BaseRepository } from './BaseRepository';

export class AbstractFirestoreRepository<
  T extends IEntity
> extends BaseRepository {
  protected readonly subColMetadata: SubCollectionMetadata[];
  protected readonly colMetadata: CollectionMetadata;
  protected readonly collectionType: FirestoreCollectionType;
  protected readonly colName: string;
  protected readonly docId: string;
  protected readonly subColName: string;

  constructor(
    nameOrConstructor: string | Function,
    docId?: string,
    subColName?: string
  ) {
    super();

    this.colName =
      typeof nameOrConstructor === 'function'
        ? nameOrConstructor.name
        : nameOrConstructor;

    this.docId = docId;
    this.subColName = subColName;

    const { getCollection, getSubCollectionsFromParent } = getMetadataStorage();
    this.colMetadata = getCollection(nameOrConstructor);

    if (!this.colMetadata) {
      throw new Error(`There is no metadata stored for "${this.colName}"`);
    }

    this.subColMetadata = getSubCollectionsFromParent(this.colMetadata.entity);

    this.collectionType = this.docId
      ? FirestoreCollectionType.subcollection
      : FirestoreCollectionType.collection;
  }

  protected toSerializableObject = (obj: T): Object => {
    this.subColMetadata.forEach(scm => {
      delete obj[scm.propertyKey];
    });
    return { ...obj };
  };

  protected transformFirestoreTypes = (obj: T): T => {
    Object.keys(obj).forEach(key => {
      if (!obj[key]) return;
      if (typeof obj[key] === 'object' && 'toDate' in obj[key]) {
        obj[key] = obj[key].toDate();
      } else if (obj[key].constructor.name === 'GeoPoint') {
        const { latitude, longitude } = obj[key];
        obj[key] = { latitude, longitude };
      } else if (typeof obj[key] === 'object') {
        this.transformFirestoreTypes(obj[key]);
      }
    });
    return obj;
  };

  protected initializeSubCollections = (entity: T) => {
    // Requiring here to prevent circular dependency
    const { GetRepository } = require('./helpers');

    this.subColMetadata.forEach(subCol => {
      Object.assign(entity, {
        [subCol.propertyKey]: GetRepository(
          subCol.entity as any,
          entity.id,
          subCol.name
        ),
      });
    });
  };

  protected extractTFromDocSnap = (doc: DocumentSnapshot): T => {
    if (!doc.exists) {
      return null;
    }
    // tslint:disable-next-line:no-unnecessary-type-assertion
    const entity = plainToClass(
      this.colMetadata.entity as any,
      this.transformFirestoreTypes(doc.data() as T)
    ) as T;
    if (this.collectionType === FirestoreCollectionType.collection) {
      this.initializeSubCollections(entity);
    }
    return entity;
  };

  protected extractTFromColSnap = (q: QuerySnapshot): T[] => {
    return q.docs.map(this.extractTFromDocSnap);
  };
}
