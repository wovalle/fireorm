import { Firestore } from '@google-cloud/firestore';
import { ValidatorOptions } from 'class-validator';
import { BaseRepository } from './BaseRepository';
import { DuplicatedReference } from './Errors';
import { IEntityConstructor, Constructor, IEntity, IEntityRepositoryConstructor } from './types';
import { arraysAreEqual } from './utils';

export interface CollectionMetadata {
  name: string;
  entityConstructor: IEntityConstructor;
  parentEntityConstructor?: IEntityConstructor;
  propertyKey?: string;
}
export interface SubCollectionMetadata extends CollectionMetadata {
  parentEntityConstructor: IEntityConstructor;
  propertyKey: string;
}

export interface CollectionMetadataWithSegments extends CollectionMetadata {
  segments: string[];
}

export interface SubCollectionMetadataWithSegments extends SubCollectionMetadata {
  segments: string[];
}

export interface FullCollectionMetadata extends CollectionMetadataWithSegments {
  subCollections: SubCollectionMetadataWithSegments[];
  references: ReferenceMetadata[];
}
export interface RepositoryMetadata {
  target: IEntityRepositoryConstructor;
  entity: IEntityConstructor;
}

export interface ReferenceMetadata {
  origin: IEntityConstructor;
  target: IEntityConstructor;
  propertyKey: string;
}

export interface MetadataStorageConfig {
  validateModels: boolean;
  validatorOptions?: ValidatorOptions;
}

export class MetadataStorage {
  readonly collections: Array<CollectionMetadataWithSegments> = [];
  readonly references: Array<ReferenceMetadata> = [];
  protected readonly repositories: Map<IEntityConstructor, RepositoryMetadata> = new Map();

  public config: MetadataStorageConfig = {
    validateModels: false,
    validatorOptions: {},
  };

  public getCollection = (pathOrConstructor: string | IEntityConstructor) => {
    let collection: CollectionMetadataWithSegments | undefined;

    // If is a path like users/user-id/messages/message-id/senders,
    // take all the even segments [users/messages/senders] and
    // look for an entity with those segments
    if (typeof pathOrConstructor === 'string') {
      const segments = pathOrConstructor.split('/');

      // Return null if incomplete segment
      if (segments.length % 2 === 0) {
        throw new Error(`Invalid collection path: ${pathOrConstructor}`);
      }

      const collectionSegments = segments.reduce<string[]>(
        (acc, cur, index) => (index % 2 === 0 ? acc.concat(cur) : acc),
        []
      );

      collection = this.collections.find(c => arraysAreEqual(c.segments, collectionSegments));
    } else {
      collection = this.collections.find(c => c.entityConstructor === pathOrConstructor);
    }

    if (!collection) {
      return null;
    }

    const subCollections = this.collections.filter(
      s => s.parentEntityConstructor === collection?.entityConstructor
    ) as SubCollectionMetadataWithSegments[];

    const references = this.references.filter(r => r.origin === collection?.entityConstructor);

    return {
      ...collection,
      subCollections,
      references,
    };
  };

  public getReferences = (col: IEntityConstructor) => {
    return this.references.filter(r => r.origin === col);
  };

  public setReference = (ref: ReferenceMetadata) => {
    const existing = this.getReferences(ref.origin);

    if (existing.length) {
      throw new DuplicatedReference(ref.propertyKey, ref.origin.name);
    }

    this.references.push(ref);
  };

  public setCollection = (col: CollectionMetadata) => {
    const existing = this.getCollection(col.entityConstructor);

    if (existing) {
      throw new Error(`Collection with name ${existing.name} has already been registered`);
    }

    const colToAdd = {
      ...col,
      segments: [col.name],
    };

    this.collections.push(colToAdd);

    const getWhereImParent = (p: Constructor<IEntity>) =>
      this.collections.filter(c => c.parentEntityConstructor === p);

    const colsToUpdate = getWhereImParent(col.entityConstructor);

    // Update segments for subcollections and subcollections of subcollections
    while (colsToUpdate.length) {
      const c = colsToUpdate.pop();

      if (!c) {
        return;
      }

      const parent = this.collections.find(p => p.entityConstructor === c.parentEntityConstructor);
      c.segments = parent?.segments.concat(c.name) || [];
      getWhereImParent(c.entityConstructor).forEach(col => colsToUpdate.push(col));
    }
  };

  public getRepository = (param: IEntityConstructor) => {
    return this.repositories.get(param) || null;
  };

  public setRepository = (repo: RepositoryMetadata) => {
    const savedRepo = this.getRepository(repo.entity);

    if (savedRepo && repo.target !== savedRepo.target) {
      throw new Error('Cannot register a custom repository twice with two different targets');
    }

    if (!(repo.target.prototype instanceof BaseRepository)) {
      throw new Error(
        'Cannot register a custom repository on a class that does not inherit from BaseFirestoreRepository'
      );
    }

    this.repositories.set(repo.entity, repo);
  };

  public getRepositories = () => {
    return this.repositories;
  };

  public firestoreRef: Firestore;
}
