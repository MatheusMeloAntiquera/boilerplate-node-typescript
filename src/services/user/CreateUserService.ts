import { UserService } from "./UserService";
import { User } from "@entities/UserEntity";
export class CreateUserService extends UserService {
  async execute({ name, password, email }: User) {
    const user = this.userRepository.create({
      name,
      password,
      email,
    });

    return this.userRepository.save(user);
  }
}
