import { ConflictException, Inject, Injectable, UseInterceptors } from "@nestjs/common";
import { FilmRepository } from '../repo/film.repository';
import { CreateFilmDTO } from "src/dto/create-film.dto";
import { UpdateFilmDTO } from "src/dto/update-film.dto";
import { Film } from "src/entity/film.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Cache } from "cache-manager";
import { CACHE_MANAGER} from "@nestjs/cache-manager";

@Injectable()
export class FilmService{
  constructor(
    @InjectRepository(Film)
    private filmRepository: FilmRepository,
    @Inject(CACHE_MANAGER) private readonly cacheManager:Cache) {}
  async findOneByFilmname(filmname:string): Promise<any>{
    return this.filmRepository.findOne({ where: { filmName:filmname } });
  }
  async findOne(id:number): Promise<any>{
    return await this.filmRepository.findOne({ where: { id } });
  }
  async findAll(): Promise<any>{
    const filmsData = await this.filmRepository.find();
    return filmsData ;
  }

  async create(createFilmDTO:CreateFilmDTO): Promise<Film>{
    let film = new Film();
    film = {...film,filmName:createFilmDTO.filmName,durationInMinutes:createFilmDTO.durationInMinutes,releaseDate:createFilmDTO.releaseDate}
    await this.filmRepository.save(film);
    return film;
  }

  async update(film: Film,id:number): Promise<Film>{
    await this.filmRepository.save(film);
    return await this.filmRepository.findOne({ where: { id } });
  }

  async delete(id:number): Promise<any>{
    await this.filmRepository.delete(id);
  }

}