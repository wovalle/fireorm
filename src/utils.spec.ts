import { Ignore } from './Decorators/Ignore';
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
    it('should not return properties with an Ignore() decorator', () => {
      class Band implements IEntity {
        id: string;
        name: string;
        @Ignore()
        temporaryName: string;
      }

      const rhcp = new Band();
      rhcp.name = 'Red Hot Chili Peppers';
      rhcp.temporaryName = 'Tony Flow and the Miraculously Majestic Masters of Mayhem';

      expect(serializeEntity(rhcp, [])).toHaveProperty('name');
      expect(serializeEntity(rhcp, [])).not.toHaveProperty('temporaryName');
    });
  });
});
