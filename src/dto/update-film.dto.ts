import { PartialType } from '@nestjs/swagger';
import { CreateFilmDTO } from './create-film.dto';

export class UpdateFilmDTO extends PartialType(CreateFilmDTO) {}