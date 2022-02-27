import { UserRepository } from "@repositories/UserRepository";
import { getCustomRepository } from "typeorm";

export abstract class UserService {
    protected userRepository: UserRepository;
    constructor(){
        this.userRepository = getCustomRepository(UserRepository);
    }
}