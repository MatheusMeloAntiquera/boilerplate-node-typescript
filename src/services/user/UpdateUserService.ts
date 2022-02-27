import { UserInterface } from "src/interfaces/UserInterface";
import { UserService } from "./UserService";

export class UpdateUserService extends UserService {
  async execute({ id, name, password, email }: UserInterface) {
    const user = await this.userRepository.findOne(id);
    if(user === undefined) {
        return false;
    }

    //Todo: Create a request validation
    user.name = name !== undefined ? name : user.name;
    user.email = email !== undefined ? email : user.email ;
    user.password = password !== undefined ? password : user.password;

    return this.userRepository.save(user);
  }
}