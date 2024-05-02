import { IsString, IsInt, IsDate } from 'class-validator';

export class CreateFilmDTO {
  @IsString()
  readonly filmName: string;

  @IsInt()
  readonly durationInMinutes: number;

  @IsDate()
  readonly releaseDate: Date;
}