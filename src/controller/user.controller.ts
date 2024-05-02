import { Body, ConflictException, Controller, Delete, Get, HttpCode, Param, ParseIntPipe, Patch, Post, Put, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateUserDTO } from "src/dto/create-user.dto";
import { UpdateUserDTO } from "src/dto/update-user.dto";
import { User } from "src/entity/user.entity";
import { UserRepository } from "src/repo/user.repository";
import { UserService } from "src/service/user.service";

@Controller('users')
export class UserController{
  
  constructor(private userService:UserService,
    @InjectRepository(User)
    private userRepository:UserRepository){}
  
  @Get()
  @HttpCode(200)
  @UseGuards(AuthGuard('jwt'))
  async findAll(): Promise<Array<User>> {
    return await this.userService.findAll();
  }

  @Get(':id')
  @HttpCode(200)
  @UseGuards(AuthGuard('jwt'))
  async findOne(@Param('id', ParseIntPipe) id:number): Promise<User> {
    return await this.userService.findOne(id);
  }

  @Post()
  @HttpCode(201)
  @UseGuards(AuthGuard('jwt'))
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
  async putUser(@Body() updateUserDTO:UpdateUserDTO,@Param('id', ParseIntPipe) id:number): Promise<User>{
    const user = new User();
    const user_updated = {...user,id:id,firstName:updateUserDTO.firstname,lastName:updateUserDTO.lastname,email:updateUserDTO.email,userName:updateUserDTO.username,password:updateUserDTO.password}
    return await this.userService.update(user_updated,id);
  }

  @Delete(':id')
  @HttpCode(202)
  @UseGuards(AuthGuard('jwt'))
  async deleteUser(@Param('id', ParseIntPipe) id:number){
    return await this.userService.delete(id);
  }

}