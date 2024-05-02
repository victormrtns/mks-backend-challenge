import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilmController } from 'src/controller/film.controller';
import { Film } from 'src/entity/film.entity';
import { FilmRepository } from 'src/repo/film.repository';
import { FilmService } from 'src/service/film.service';

@Module({
  imports:[TypeOrmModule.forFeature([Film])],
  controllers: [FilmController],
  providers: [FilmService,FilmRepository],
})
export class FilmModule {}