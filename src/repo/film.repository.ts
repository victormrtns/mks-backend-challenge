import { Film } from "src/entity/film.entity";
import { Repository } from "typeorm";

export class FilmRepository extends Repository<Film>{
  this: Repository<Film>;
}