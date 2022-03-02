import { UserService } from "./UserService";

export class ListUserService extends UserService {
  async execute() {
    return this.userRepository.find();
  }
}
