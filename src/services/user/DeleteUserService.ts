import { FindUserService } from "./FindUserService";
import { UserService } from "./UserService";

export class DeleteUserService extends UserService {
  async execute(id: number|string ) {
    await new FindUserService().execute(id);
    return this.userRepository.delete(id);
  }
}
