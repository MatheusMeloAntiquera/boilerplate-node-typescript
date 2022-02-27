import { UserInterface } from "src/interfaces/UserInterface";
import { UserService } from "./UserService";

export class CreateUserService extends UserService {
  async execute({ name, password, email }: UserInterface) {
    const user = this.userRepository.create({
      name,
      password,
      email,
    });

    return this.userRepository.save(user);
  }
}
