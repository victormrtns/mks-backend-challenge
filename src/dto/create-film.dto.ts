import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt, IsDate } from 'class-validator';

export class CreateFilmDTO {
  @IsString()
  @ApiProperty({ example: 'Film Example', description: 'Name of the film' })
  readonly filmName: string;

  @IsInt()
  @ApiProperty({ example: 90, description: 'Duration of the film' })
  readonly durationInMinutes: number;

  @IsDate()
  @ApiProperty({ example: '2022-05-06', description: 'Date of the film' })
  readonly releaseDate: Date;
}