import Collection from './Decorators/Collection';
import SubCollection from './Decorators/SubCollection';
import CustomRepository from './Decorators/CustomRepository';
import BaseFirestoreRepository from './BaseFirestoreRepository';

export * from './types';
export * from './helpers';
export * from './Decorators/Relationships';

export { Initialize } from './MetadataStorage';

export { Collection, SubCollection, CustomRepository, BaseFirestoreRepository };

// Temporary while https://github.com/wovalle/fireorm/issues/58 is being fixed
export { Type } from 'class-transformer';
