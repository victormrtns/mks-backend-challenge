import { CacheInterceptor, CacheKey } from "@nestjs/cache-manager";
import { Body, ConflictException, Controller, Delete, Get, HttpCode, Param, ParseIntPipe, Patch, Post, Put, UseGuards, UseInterceptors } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiBadRequestResponse, ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateFilmDTO } from "src/dto/create-film.dto";
import { UpdateFilmDTO } from "src/dto/update-film.dto";
import { Film } from "src/entity/film.entity";
import { FilmRepository } from "src/repo/film.repository";
import { FilmService } from "src/service/film.service";

@ApiTags('films')
@ApiBearerAuth()
@Controller('films')
@UseInterceptors(CacheInterceptor)
export class FilmController{
  
  constructor(private filmService:FilmService,
    @InjectRepository(Film)
    private filmRepository:FilmRepository){}
  
  @Get()
  @HttpCode(200)
  @UseGuards(AuthGuard('jwt'))
  @ApiOkResponse({ description: 'Films list has been returned'})
  @ApiBadRequestResponse({ description: 'Films list has not been returned. Try Again'})
  async findAll(): Promise<Array<Film>> {
    return await this.filmService.findAll();
  }

  @Get(':id')
  @HttpCode(200)
  @UseGuards(AuthGuard('jwt'))
  @ApiOkResponse({ description: 'Film was found'})
  @ApiBadRequestResponse({ description: 'Film was not found. Try Again'})
  async findOne(@Param('id', ParseIntPipe) id:number): Promise<Film> {
    return await this.filmService.findOne(id);
  }

  @Post()
  @HttpCode(201)
  @UseGuards(AuthGuard('jwt'))
  @ApiCreatedResponse({ description: 'Film has been created',type:Film})
  @ApiBadRequestResponse({ description: 'Film has not been created. Try Again'})
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
  @ApiOkResponse({ description: 'Film has been updated',type:Film})
  @ApiBadRequestResponse({ description: 'Film has not been updated. Try Again'})
  async putFilm(@Body() updateFilmDTO:UpdateFilmDTO,@Param('id', ParseIntPipe) id:number): Promise<Film>{
    const film = new Film();
    const film_updated = {...film,id:id,filmName:updateFilmDTO.filmName,durationInMinutes:updateFilmDTO.durationInMinutes,releaseDate:updateFilmDTO.releaseDate}
    return await this.filmService.update(film_updated,id);
  }

  @Delete(':id')
  @HttpCode(202)
  @UseGuards(AuthGuard('jwt'))
  @ApiOkResponse({ description: 'Film has been deleted'})
  @ApiBadRequestResponse({ description: 'Film has not been deleted'})
  async deleteFilm(@Param('id', ParseIntPipe) id:number){
    return await this.filmService.delete(id);
  }

}