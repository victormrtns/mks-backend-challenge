import { CacheInterceptor } from "@nestjs/cache-manager";
import { Body, ConflictException, Controller, Delete, Get, HttpCode, Param, ParseIntPipe, Patch, Post, Put, UseGuards, UseInterceptors } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiBadRequestResponse, ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateUserDTO } from "src/dto/create-user.dto";
import { UpdateUserDTO } from "src/dto/update-user.dto";
import { User } from "src/entity/user.entity";
import { UserRepository } from "src/repo/user.repository";
import { UserService } from "src/service/user.service";

@ApiTags('users')
@ApiBearerAuth()
@Controller('users')
@UseInterceptors(CacheInterceptor)
export class UserController{
  
  constructor(private userService:UserService,
    @InjectRepository(User)
    private userRepository:UserRepository){}
  
  @Get()
  @HttpCode(200)
  @UseGuards(AuthGuard('jwt'))
  @ApiOkResponse({ description: 'Users list has been returned'})
  @ApiBadRequestResponse({ description: 'Users list has not been returned. Try Again'})
  async findAll(): Promise<Array<User>> {
    console.log("Inside Controller")
    return await this.userService.findAll();
  }

  @Get(':id')
  @HttpCode(200)
  @UseGuards(AuthGuard('jwt'))
  @ApiOkResponse({ description: 'User was found'})
  @ApiBadRequestResponse({ description: 'User was not found. Try Again'})
  async findOne(@Param('id', ParseIntPipe) id:number): Promise<User> {
    return await this.userService.findOne(id);
  }

  @Post()
  @HttpCode(201)
  @ApiCreatedResponse({ description: 'User has been created',type:User})
  @ApiBadRequestResponse({ description: 'User has not been created. Try Again'})
  async postUser(@Body() createUserDTO:CreateUserDTO): Promise<User> {
    const user = await this.userRepository.findOne({
      where:[
        {userName:createUserDTO.username},
        {email:createUserDTO.email}
        ]
    })
    if(user){
      throw new ConflictException('User already exists in the database', { cause: new Error(), description: 'User already exists in the database' })
    }
    return await this.userService.create(createUserDTO);
  }

  @Put(':id')
  @HttpCode(200)
  @UseGuards(AuthGuard('jwt'))
  @ApiOkResponse({ description: 'User has been updated',type:User})
  @ApiBadRequestResponse({ description: 'User has not been updated. Try Again'})
  async putUser(@Body() updateUserDTO:UpdateUserDTO,@Param('id', ParseIntPipe) id:number): Promise<User>{
    const user = new User();
    const user_updated = {...user,id:id,firstName:updateUserDTO.firstname,lastName:updateUserDTO.lastname,email:updateUserDTO.email,userName:updateUserDTO.username,password:updateUserDTO.password}
    return await this.userService.update(user_updated,id);
  }

  @Delete(':id')
  @HttpCode(202)
  @UseGuards(AuthGuard('jwt'))
  @ApiOkResponse({ description: 'User has been deleted'})
  @ApiBadRequestResponse({ description: 'User has not been deleted'})
  async deleteUser(@Param('id', ParseIntPipe) id:number){
    return await this.userService.delete(id);
  }

}