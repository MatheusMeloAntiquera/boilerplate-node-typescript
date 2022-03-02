import { User } from "@entities/UserEntity";
import { ValidationError } from "@errors/ValidationError";
import { UserRepository } from "@repositories/UserRepository";
import { ValidationObjectHelper } from "@helpers/ValidationObjectHelper";
import { getCustomRepository, ObjectID } from "typeorm";
import { AppError } from "@errors/AppError";

export abstract class UserService {
  protected userRepository: UserRepository;
  constructor() {
    this.userRepository = getCustomRepository(UserRepository);
  }

  protected async isValidUserToSaveOrFail(user: User) {
    const validationObjectHelper = new ValidationObjectHelper(user);
    const isValid = await validationObjectHelper.isValid();
    if (!isValid) {
      throw new ValidationError(
        "It's not possible to create or update the user",
        validationObjectHelper.getErrors()
      );
    }
  }
}
