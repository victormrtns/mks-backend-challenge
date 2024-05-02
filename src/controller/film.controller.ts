import { Body, ConflictException, Controller, Delete, Get, HttpCode, Param, ParseIntPipe, Patch, Post, Put, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateFilmDTO } from "src/dto/create-film.dto";
import { UpdateFilmDTO } from "src/dto/update-film.dto";
import { Film } from "src/entity/film.entity";
import { FilmRepository } from "src/repo/film.repository";
import { FilmService } from "src/service/film.service";

@Controller('films')
export class FilmController{
  
  constructor(private filmService:FilmService,
    @InjectRepository(Film)
    private filmRepository:FilmRepository){}
  
  @Get()
  @HttpCode(200)
  @UseGuards(AuthGuard('jwt'))
  async findAll(): Promise<Array<Film>> {
    return await this.filmService.findAll();
  }

  @Get(':id')
  @HttpCode(200)
  @UseGuards(AuthGuard('jwt'))
  async findOne(@Param('id', ParseIntPipe) id:number): Promise<Film> {
    return await this.filmService.findOne(id);
  }

  @Post()
  @HttpCode(201)
  @UseGuards(AuthGuard('jwt'))
  async postFilm(@Body() createFilmDTO:CreateFilmDTO): Promise<Film> {
    const film = await this.filmRepository.findOne({
      where:[
        {filmName:createFilmDTO.filmName}
        ]
    })
    if(film){
      throw new ConflictException('Film already exists in the database', { cause: new Error(), description: 'Film already exists in the database' })
    }
    return await this.filmService.create(createFilmDTO);
  }

  @Put(':id')
  @HttpCode(200)
  @UseGuards(AuthGuard('jwt'))
  async putFilm(@Body() updateFilmDTO:UpdateFilmDTO,@Param('id', ParseIntPipe) id:number): Promise<Film>{
    const film = new Film();
    const film_updated = {...film,id:id,filmName:updateFilmDTO.filmName,durationInMinutes:updateFilmDTO.durationInMinutes,releaseDate:updateFilmDTO.releaseDate}
    return await this.filmService.update(film_updated,id);
  }

  @Delete(':id')
  @HttpCode(202)
  @UseGuards(AuthGuard('jwt'))
  async deleteFilm(@Param('id', ParseIntPipe) id:number){
    return await this.filmService.delete(id);
  }

}