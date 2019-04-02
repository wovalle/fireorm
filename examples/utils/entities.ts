import { Collection, SubCollection, ISubCollection } from '../../src';

@Collection()
export class Band {
  id: string;
  name: string;
  formationYear: number;
  genres: Array<string>;
}

export class Album {
  id: string;
  name: string;
  year: number;
}

@Collection()
export class FullBand {
  id: string;
  name: string;
  formationYear: number;
  genres: Array<string>;

  @SubCollection(Album)
  albums: ISubCollection<Album>;
}
