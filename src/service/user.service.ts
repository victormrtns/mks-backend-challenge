import { ConflictException, Inject, Injectable} from "@nestjs/common";
import { UserRepository } from '../repo/user.repository';
import { CreateUserDTO } from "src/dto/create-user.dto";
import { UpdateUserDTO } from "src/dto/update-user.dto";
import { User } from "src/entity/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Cache } from "cache-manager";
import { CACHE_MANAGER } from "@nestjs/cache-manager";

@Injectable()
export class UserService{
  constructor(
    @InjectRepository(User)
    private userRepository: UserRepository,
    @Inject(CACHE_MANAGER) private readonly cacheManager:Cache) {}
  async findOneByUsername(username:string): Promise<any>{
    return this.userRepository.findOne({ where: { userName:username } });
  }
  async findOne(id:number): Promise<any>{
    return this.userRepository.findOne({ where: { id } });
  }
  async findAll(): Promise<any>{
    console.log("Inside Service")
    const cachedData = await this.cacheManager.get('users')
    if (cachedData){
      return cachedData
    }
    const usersData = await this.userRepository.find();
    await this.cacheManager.set('users',usersData,60 * 10000)
    return usersData;
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