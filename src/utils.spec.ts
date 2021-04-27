import { Serialize } from './Decorators/Serialize';
import { IEntity } from './types';
import { extractAllGetters, serializeEntity } from './utils';

describe('Utils', () => {
  describe('extractAllGetter', () => {
    describe('Class', () => {
      it('should return only getters not data property', () => {
        class ClassTest {
          public a = 'a';
          private _c;

          public get b() {
            return 'b';
          }
        }

        const b = new ClassTest();

        const extracted = extractAllGetters((b as unknown) as Record<string, unknown>);
        expect(extracted).toEqual({ b: 'b' });
      });

      it('should return only getters not method', () => {
        class ClassTest {
          public get b() {
            return 'b';
          }

          public a() {
            return 'a method';
          }
        }

        const b = new ClassTest();

        const extracted = extractAllGetters((b as unknown) as Record<string, unknown>);
        expect(extracted).toEqual({ b: 'b' });
      });
    });

    it('should return only getters which return undefined', () => {
      class ClassTest {
        public a = 'a';

        public get b() {
          return 'b';
        }

        public get c() {
          return undefined;
        }
      }

      const b = new ClassTest();

      const extracted = extractAllGetters((b as unknown) as Record<string, unknown>);
      expect(extracted).toEqual({ b: 'b' });
    });
  });

  describe('serializeEntity', () => {
    it('should serialize object properties with the @Serialize() decorator', () => {
      class Address {
        streetName: string;
        number: number;
        numberAddition: string;
      }

      class Band implements IEntity {
        id: string;
        name: string;
        @Serialize()
        address: Address;
      }

      const address = new Address();
      address.streetName = 'Baker St.';
      address.number = 211;
      address.numberAddition = 'B';

      const band = new Band();
      band.name = 'the Speckled Band';
      band.address = address;

      expect(serializeEntity(band, [])).toHaveProperty('name');
      expect(serializeEntity(band, []).address).not.toBeInstanceOf(Address);
      expect(serializeEntity(band, []).address['number']).toBe(211);
    });

    it('should serialize object array properties with the @Serialize() decorator', () => {
      class Address {
        streetName: string;
        number: number;
        numberAddition: string;
      }

      class Band implements IEntity {
        id: string;
        name: string;
        @Serialize()
        addresses: Address[];
      }

      const address = new Address();
      address.streetName = 'Baker St.';
      address.number = 211;
      address.numberAddition = 'B';

      const address2 = new Address();
      address2.streetName = 'Baker St.';
      address2.number = 211;
      address2.numberAddition = 'C';

      const band = new Band();
      band.name = 'the Speckled Band';
      band.addresses = [address, address2];

      expect(serializeEntity(band, [])).toHaveProperty('name');
      expect(serializeEntity(band, []).addresses[0]).not.toBeInstanceOf(Address);
      expect(serializeEntity(band, []).addresses[0]['numberAddition']).toBe('B');
      expect(serializeEntity(band, []).addresses[1]['numberAddition']).toBe('C');
    });
  });
});
