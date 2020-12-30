import { Constructor, IEntity } from '..';
import { getMetadataStorage } from '../MetadataUtils';

export async function ValidateModel(item: IEntity, Entity: Constructor<IEntity>) {
  if (getMetadataStorage().config.validateModels) {
    try {
      const classValidator = await import('class-validator');

      /**
       * Instantiate plain objects into an entity class
       */
      const entity = item instanceof Entity ? item : Object.assign(new Entity(), item);
      const errors = await classValidator.validate(entity);

      if (errors.length) {
        throw errors;
      }
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

// export function ValidateModelDecorator(item: IEntity) {
//   return function (target) {
//     ValidateModel(item, target.constructor);
//   };
// }
