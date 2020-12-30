import { Constructor, IEntity } from '..';
import { Band } from '../../test/BandCollection';
import { getMetadataStorage, initialize } from '../MetadataUtils';
import { ValidateModel } from './ValidateModels';

export function ValidateModelDecorator(item: IEntity): MethodDecorator {
  return function (target, propertyKey, descriptor) {};
}
describe('ValidateModels', () => {
  it('must not validate if the validate config by default', async () => {
    initialize(null);

    const entity = new Band();
    entity.contactEmail = 'Not an email';

    expect(ValidateModel(entity, Band)).resolves.not.toThrow();
  });

  it('must validate ', async () => {
    initialize(null, { validateModels: true });

    const entity = new Band();
    entity.contactEmail = 'Not an email';

    expect(ValidateModel(entity, Band)).rejects.toThrow();
  });

  // it('must not validate if the validateModels: false', async () => {
  //   initialize(null, { validateModels: false });

  //   bandRepository = new BandRepository('bands');

  //   const entity = new Band();
  //   entity.contactEmail = 'Not an email';
  //   const band = await bandRepository.create(entity);

  //   expect(band.contactEmail).toEqual('Not an email');
  // });

  // it('must fail validation if an invalid class is given', async () => {
  //   initialize(null, { validateModels: true });

  //   const entity = new Band();

  //   entity.contactEmail = 'Not an email';

  //   try {
  //     await bandRepository.create(entity);
  //   } catch (error) {
  //     expect(error[0].constraints.isEmail).toEqual('Invalid email!');
  //   }
  // });

  // it('must fail validation if an invalid object is given', async () => {
  //   initialize(firestore, { validateModels: true });

  //   const entity: Partial<Band> = {
  //     contactEmail: 'Not an email',
  //     id: '1234',
  //   };

  //   try {
  //     await bandRepository.create(entity as Band);
  //   } catch (error) {
  //     expect(error[0].constraints.isEmail).toEqual('Invalid email!');
  //   }
  // });
});
