import { Injectable } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { ApiProperty } from '@nestjs/swagger';
import { LoginTokenDTO } from 'src/dto/login-token.dto';
import * as bcrypt from 'bcrypt';

export abstract class LoginResponse {
    @ApiProperty()
    access_token:string
}

@Injectable()
export class AuthService {
  constructor(private usersService: UserService,private jwtService: JwtService) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByUsername(username);
    const validPassword = await bcrypt.compare(pass, user.password);
    if (user && validPassword) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user:LoginTokenDTO):Promise<LoginResponse> {
    const payload = {username: user.username, password:user.password };
    return {
      access_token: this.jwtService.sign(payload, {
        secret: jwtConstants.secret,
        expiresIn: '60s'
      })
    };
  }

}