import { UserService } from "./UserService";

export class FindUserService extends UserService {
  async execute(id: number|string ) {
    return this.userRepository.findOne(id);
  }
}
