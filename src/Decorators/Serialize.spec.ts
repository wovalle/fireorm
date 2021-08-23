import { Serialize, serializeKey } from './Serialize';

describe('IgnoreDecorator', () => {
  it('should decorate properties', () => {
    class Address {
      streetName: string;
      zipcode: string;
    }

    class Band {
      id: string;
      name: string;
      @Serialize(Address)
      address: Address;
    }

    const band = new Band();

    expect(Reflect.getMetadata(serializeKey, band, 'name')).toBe(undefined);
    expect(Reflect.getMetadata(serializeKey, band, 'address')).toBe(Address);
  });
});
