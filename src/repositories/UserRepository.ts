import { EntityRepository, Repository } from "typeorm";
import { User } from "@entities/UserEntity";

@EntityRepository(User)
export class UserRepository extends Repository<User> {}
