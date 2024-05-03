import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { UserModule } from './modules/user.module';
import { UserController } from './controller/user.controller';
import { UserService } from './service/user.service';
import { UserRepository } from './repo/user.repository';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';
import { JwtStrategy } from './auth/jwt.strategy';
import { LocalStrategy } from './auth/local.strategy';
import { JwtService } from '@nestjs/jwt'; 
import { FilmModule } from './modules/film.module';
import { CacheInterceptor, CacheModule } from '@nestjs/cache-manager';
import { APP_INTERCEPTOR } from '@nestjs/core';

//Remember, change localhost to docker-container name postgres (mks-postgres_db) when u going to commit this to run.
@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    host: "localhost",
    port: 5432,
    username: 'postgres',
    password: 'password',
    database: 'mks-postgres_db',
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: true,
  }),TypeOrmModule.forFeature([User]),
  UserModule,
  AuthModule,
  FilmModule,
  CacheModule.register({
    ttl:30 * 1000,
    isGlobal:true
  })
],
  controllers: [AppController,UserController,AuthController],
  providers: [AppService,UserService,AuthService,UserRepository,JwtService]
})
export class AppModule {}
