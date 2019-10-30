import { Collection, SubCollection } from '../src/Decorators';
import { Album as AlbumEntity, Coordinates } from './fixture';
import { ISubCollection } from '../src/types';
import { Type } from '../src';
import { IsEmail, IsOptional } from 'class-validator';
import { DocumentReference } from '@google-cloud/firestore';

// Why I do this? Because by using the instance of Album
// located in fixture.ts, you have the risk to reuse the
// same class in many tests and every method that depends
// in the instance of the class being unique might clash
// with each other (happened with getRepository)
//
// Hours lost debugging this: 2
class Album extends AlbumEntity {}

@Collection('bands')
export class Band {
  id: string;
  name: string;
  formationYear: number;
  lastShow: Date;

  @IsOptional()
  @IsEmail()
  contactEmail?: string;

  // Todo create fireorm bypass decorator
  @Type(() => Coordinates)
  lastShowCoordinates: Coordinates;
  genres: Array<string>;

  @SubCollection(Album)
  albums?: ISubCollection<Album>;

  // TODO: add something meaningful here
  randomReference?: DocumentReference;

  getLastShowYear() {
    return this.lastShow.getFullYear();
  }

  getPopularGenre() {
    return this.genres[0];
  }
}
