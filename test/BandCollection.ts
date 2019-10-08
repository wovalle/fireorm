import { Collection, SubCollection } from '../src/Decorators';
import { Album, Coordinates } from './fixture';
import { ISubCollection } from '../src/types';
import { Type } from '../src';

@Collection('bands')
export class Band {
  id: string;
  name: string;
  formationYear: number;
  lastShow: Date;

  // Todo create fireorm bypass decorator
  @Type(() => Coordinates)
  lastShowCoordinates: Coordinates;
  genres: Array<string>;

  @SubCollection(Album)
  albums?: ISubCollection<Album>;

  getLastShowYear() {
    return this.lastShow.getFullYear();
  }

  getPopularGenre() {
    return this.genres[0];
  }
}
