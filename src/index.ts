import SubCollection from './Decorators/SubCollection';
import Collection from './Decorators/Collection';
import BaseFirestoreRepository, {
  getRepository,
} from './BaseFirestoreRepository';

// TODO: think better approach
export interface ISubCollection<T> {}

export { SubCollection, Collection, BaseFirestoreRepository, getRepository };
