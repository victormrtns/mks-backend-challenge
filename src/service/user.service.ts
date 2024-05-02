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
  async findOneByUsername(username:string): Promise<any>{
    return this.userRepository.findOne({ where: { userName:username } });
  }
  async findOne(id:number): Promise<any>{
    return this.userRepository.findOne({ where: { id } });
  }
  async findAll(): Promise<any>{
    return this.userRepository.find();
  }

  async create(createUserDTO:CreateUserDTO): Promise<User>{
    let user = new User();
    user = {...user,firstName:createUserDTO.firstname,lastName:createUserDTO.lastname,email:createUserDTO.email,userName:createUserDTO.username,password:createUserDTO.password}
    await this.userRepository.save(user);
    return user;
  }

  async update(user: User,id:number): Promise<User>{
    await this.userRepository.save(user);
    return await this.userRepository.findOne({ where: { id } });
  }

  async delete(id:number): Promise<any>{
    await this.userRepository.delete(id);
  }

}