import { EntityRepository, Repository } from "typeorm";
import { User } from "./UserEntity";

@EntityRepository(User)
export class UserRepository extends Repository<User> {}
