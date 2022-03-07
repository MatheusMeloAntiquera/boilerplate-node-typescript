import { getCustomRepository } from "typeorm";
import faker from "@faker-js/faker";
import { UserRepository } from "@repositories/UserRepository";
import { DeleteUserService } from "@services/user/DeleteUserService";
import { AppError } from "@errors/AppError";
import { UserFactory } from "@factories/UserFactory";
import createConnection from "@tests/scripts/createConnection";
import cleanDatabase from "@tests/scripts/cleanDatabase";
import closeConnection from "@tests/scripts/closeConnection";

let deleteUserService: DeleteUserService;
beforeAll(async () => {
  await createConnection();
  await cleanDatabase();
  deleteUserService = new DeleteUserService();
});

afterAll(async () => {
  await closeConnection();
});

describe("Testing DeleteUserService...", () => {
  test("must to be delete a user with success", async () => {
    const userRepository = getCustomRepository(UserRepository);
    const user = userRepository.create(await new UserFactory().create());

    await userRepository.save(user);
    await deleteUserService.execute(user.id);

    const userDeleted = await userRepository.findOne(user.id);
    expect(userDeleted).toBeUndefined();
  });

  test("should be failed because user not found", async () => {
    await deleteUserService.execute(faker.datatype.number()).catch((error) => {
      expect(error).toBeInstanceOf(AppError);
      expect(error.message).toBe("User not found");
    });
  });

  test("should be failed because id is not a number", async () => {
    await expect(
      deleteUserService.execute(faker.datatype.uuid())
    ).rejects.toThrow();
  });
});
