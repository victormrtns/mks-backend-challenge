import { User } from "src/entity/user.entity";
import { Repository } from "typeorm";

export class UserRepository extends Repository<User>{
  this: Repository<User>;
}