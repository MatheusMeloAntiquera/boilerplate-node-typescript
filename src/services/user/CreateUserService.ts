import { UserService } from "./UserService";
import { User } from "@entities/UserEntity";
export class CreateUserService extends UserService {
  async execute({ name, password, email }: User) {
    const user = this.userRepository.create({
      name,
      password,
      email,
    });

    await this.isValidUserToSaveOrFail(user);
    await this.userRepository.save(user);
    return user;
  }
}
