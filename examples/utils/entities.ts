import { Collection } from '../../src';

@Collection()
export class Band {
  id: string;
  name: string;
  formationYear: number;
  genres: Array<string>;
}
