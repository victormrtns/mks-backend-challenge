import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '../modules/user.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { AuthController } from './auth.controller';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { UserService } from 'src/service/user.service';
import { UserRepository } from 'src/repo/user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entity/user.entity';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
  UserModule,
  PassportModule,
  JwtModule.register({
    secret: jwtConstants.secret,
    signOptions: {
      expiresIn: '60s' 
    },
  }),
  TypeOrmModule.forFeature([User])
],
  providers: [AuthService,LocalStrategy,UserService,UserRepository, JwtStrategy,JwtService],
  controllers:[AuthController],
  exports: [AuthService]
})
export class AuthModule {}
