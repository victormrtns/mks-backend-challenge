import { Controller, Request, Post, UseGuards, Get, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService, LoginResponse } from './auth.service';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiOkResponse, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { LoginTokenDTO } from "src/dto/login-token.dto";

@Controller()
@ApiSecurity('basic')
@ApiTags('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @UseGuards(AuthGuard('local'))
  @Post('auth/login')
  @ApiCreatedResponse({ description: 'The token has been successfully created.',type:LoginResponse})
  @ApiBadRequestResponse({ description: 'Token has not been generated. Try Again'})
  async login(@Body() login:LoginTokenDTO) {
    return this.authService.login(login);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  @ApiOkResponse({ description: 'User Has been found'})
  @ApiBadRequestResponse({ description: 'User Has not been found'})
  getProfile(@Request() req) {
    return req.user;
  }
}