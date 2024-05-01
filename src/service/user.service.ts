import { ConflictException, Injectable } from "@nestjs/common";
import { UserRepository } from '../repo/user.repository';
import { CreateUserDTO } from "src/dto/create-user.dto";
import { UpdateUserDTO } from "src/dto/update-user.dto";
import { User } from "src/entity/user.entity";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class UserService{
  constructor(
    @InjectRepository(User)
    private userRepository: UserRepository) {}
  async findOne(id:number): Promise<any>{
    return "a"
  }
  async findAll(): Promise<any>{
    return "a"
  }

  async create(createUserDTO:CreateUserDTO): Promise<User>{
    let user = new User();
    user = {...user,firstName:createUserDTO.firstname,lastName:createUserDTO.lastname,email:createUserDTO.email,userName:createUserDTO.username,password:createUserDTO.password}
    console.log(user);
    await this.userRepository.save(user);
    return user;
  }

  async update(updateUserDTO:UpdateUserDTO,id:number): Promise<User>{
    let found_user = await this.userRepository.findOne({
      where:[
        {id:id}
        ]
    })
    if(!found_user){
      throw new ConflictException('Id doesnt exist inside the database', { cause: new Error(), description: 'Id doesnt exist inside the database' })
    } 
    let saved_user = {...found_user,firstName:updateUserDTO.firstname,lastName:updateUserDTO.lastname,email:updateUserDTO.email,userName:updateUserDTO.username}
    await this.userRepository.save(saved_user);
    return saved_user;
  }

  async delete(id:number): Promise<any>{
    return "a";
  }

}