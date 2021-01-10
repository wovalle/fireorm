import { Collection, SubCollection } from '../src/Decorators';
import {
  Album as AlbumEntity,
  AlbumImage as AlbumImageEntity,
  Coordinates,
  FirestoreDocumentReference,
} from './fixture';
import { ISubCollection } from '../src/types';
import { Type } from '../src';
import { IsEmail, IsOptional, Length } from 'class-validator';

// Why I do this? Because by using the instance of Album
// located in fixture.ts, you have the risk to reuse the
// same class in many tests and every method that depends
// in the instance of the class being unique might clash
// with each other (happened with getRepository)
//
// Hours lost debugging this: 2

class AlbumImage extends AlbumImageEntity {}

export class Album extends AlbumEntity {
  @Length(1, 50, { message: 'Name is too long' })
  name: string;

  @SubCollection(AlbumImage, 'images')
  images?: ISubCollection<AlbumImage>;
}

@Collection('bands')
export class Band {
  id: string;
  name: string;
  formationYear: number;
  lastShow: Date;

  @IsOptional()
  @IsEmail({}, { message: 'Invalid email!' })
  contactEmail?: string;

  // Todo create fireorm bypass decorator
  @Type(() => Coordinates)
  lastShowCoordinates: Coordinates;
  genres: Array<string>;

  @SubCollection(Album, 'albums')
  albums?: ISubCollection<Album>;

  @Type(() => FirestoreDocumentReference)
  relatedBand?: FirestoreDocumentReference;

  getLastShowYear() {
    return this.lastShow.getFullYear();
  }

  getPopularGenre() {
    return this.genres[0];
  }
}
