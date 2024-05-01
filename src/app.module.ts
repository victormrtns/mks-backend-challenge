import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { UserModule } from './modules/user.module';
import { UserController } from './controller/user.controller';
import { UserService } from './service/user.service';
import { UserRepository } from './repo/user.repository';

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
  UserModule
],
  controllers: [AppController,UserController],
  providers: [AppService,UserService,UserRepository]
})
export class AppModule {}
