import { IEntity, Constructor } from '../types';
import { Firestore, DocumentReference } from '@google-cloud/firestore';
import { FullCollectionMetadata } from '../MetadataStorage';
import { serializeEntity } from '../utils';
import { ValidationError } from '../Errors/ValidationError';
import { ValidatorOptions } from 'class-validator';

type BatchOperation<T extends IEntity> = {
  type: 'create' | 'update' | 'delete';
  item: IEntity;
  ref: DocumentReference;
  collectionMetadata: FullCollectionMetadata;
  validateModels: boolean;
  validatorOptions: ValidatorOptions
};

export class FirestoreBatchUnit {
  private status: 'pending' | 'committing' = 'pending';
  public operations: BatchOperation<IEntity>[] = [];

  constructor(private firestoreRef: Firestore) {}

  add<T extends IEntity>(
    type: BatchOperation<T>['type'],
    item: T,
    ref: DocumentReference,
    collectionMetadata: FullCollectionMetadata,
    validateModels: boolean,
    validatorOptions: ValidatorOptions = {}
  ) {
    this.operations.push({
      type,
      item,
      ref,
      collectionMetadata,
      validateModels,
      validatorOptions
    });
  }

  commit = async () => {
    if (this.status === 'committing') {
      throw new Error('This Batch is being committed');
    }

    if (this.operations.length === 0) {
      throw new Error('Cannot commit a batch with zero operations');
    }

    this.status = 'committing';
    const batch = this.firestoreRef.batch();

    for (const op of this.operations) {
      if (op.validateModels && ['create', 'update'].includes(op.type)) {
        const errors = await this.validate(op.item, op.collectionMetadata.entityConstructor, op.validatorOptions);

        if (errors.length) {
          throw errors;
        }
      }

      const serialized = serializeEntity(op.item, op.collectionMetadata.subCollections);

      switch (op.type) {
        case 'create':
          batch.set(op.ref, serialized);
          break;
        case 'update':
          batch.update(op.ref, serialized);
          break;
        case 'delete':
          batch.delete(op.ref, serialized);
          break;
      }
    }

    const result = await batch.commit();
    this.operations = [];
    this.status = 'pending';

    return result;
  };

  async validate(item: IEntity, Entity: Constructor<IEntity>, validatorOptions: ValidatorOptions): Promise<ValidationError[]> {
    try {
      const classValidator = await import('class-validator');

      /**
       * Instantiate plain objects into an entity class
       */
      const entity = item instanceof Entity ? item : Object.assign(new Entity(), item);

      return classValidator.validate(entity, validatorOptions);
    } catch (error) {
      if (error.code === 'MODULE_NOT_FOUND') {
        throw new Error(
          'It looks like class-validator is not installed. Please run `npm i -S class-validator` to fix this error, or initialize FireORM with `validateModels: false` to disable validation.'
        );
      }

      throw error;
    }
  }
}
