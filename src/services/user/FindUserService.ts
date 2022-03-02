import { AppError } from "@errors/AppError";
import { UserService } from "./UserService";

export class FindUserService extends UserService {
  async execute(id: number | string) {
    const user = await this.userRepository.findOne(id);
    if (user === undefined) {
      throw new AppError("User not found", 404);
    }
    return user;
  }
}
