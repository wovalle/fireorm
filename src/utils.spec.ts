import { Collection, CustomRepository } from './Decorators';
import { BaseFirestoreRepository } from './BaseFirestoreRepository';
import { getRepository, getBaseRepository, runTransaction, createBatch } from './helpers';
import { initialize } from './MetadataStorage';
import { FirestoreTransaction } from './Transaction/FirestoreTransaction';
import { FirestoreBatch } from './Batch/FirestoreBatch';
import { extractAllGetter } from './utils';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const MockFirebase = require('mock-cloud-firestore');

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

        const extracted = extractAllGetter(b);
        expect(extracted).toEqual({ b: 'b' });
      });

      it('should return only getters not method', () => {
        class ClassTest {
          public get b() {
            return 'b';
          }

          public a() {
            return 'a method';
          };
        }

        const b = new ClassTest();

        const extracted = extractAllGetter(b);
        expect(extracted).toEqual({ b: 'b' });
      });

    });
  });
});


