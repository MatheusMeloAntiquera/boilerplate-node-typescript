import { User } from "@entities/UserEntity";
import { FindUserService } from "./FindUserService";
import { UserService } from "./UserService";

export class UpdateUserService extends UserService {
  async execute({ id, name, password, email }: User) {
    const user = await new FindUserService().execute(id);
    user.name = name;
    user.email = email;
    user.password = password;

    await this.isValidUserToSaveOrFail(user);
    await this.userRepository.save(user);

    return user;
  }
}
