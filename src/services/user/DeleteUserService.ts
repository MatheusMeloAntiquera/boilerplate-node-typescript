import { UserService } from "./UserService";

export class DeleteUserService extends UserService {
  async execute(id: number|string ) {
    //Todo: check if the user exists before delete
    return this.userRepository.delete(id);
  }
}
