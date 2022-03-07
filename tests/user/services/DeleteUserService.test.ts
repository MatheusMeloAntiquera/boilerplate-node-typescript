import { createConnection, getConnection, getCustomRepository } from "typeorm";
import faker from "@faker-js/faker";
import { UserRepository } from "@repositories/UserRepository";
import { DeleteUserService } from "@services/user/DeleteUserService";
import { AppError } from "@errors/AppError";
import { UserFactory } from "@factories/UserFactory";

beforeAll(async () => {
  // console.log(process.env.TYPEORM_CONNECTION)
  // Fetch all the entities
  await createConnection();
  const entities = getConnection().entityMetadatas;
  for (const entity of entities) {
    const repository = getConnection().getRepository(entity.name); // Get repository
    await repository.clear(); // Clear each entity table's content
  }
});

describe("Testing DeleteUserService...", () => {
  test("must to be delete a user with success", async () => {
    const userRepository = getCustomRepository(UserRepository);
    const user = userRepository.create(await new UserFactory().create());

    await userRepository.save(user);
    await new DeleteUserService().execute(user.id);

    const userDeleted = await userRepository.findOne(user.id);
    expect(userDeleted).toBeUndefined();
  });

  test("should be failed because user not found", async () => {
    await new DeleteUserService()
      .execute(faker.datatype.number())
      .catch((error) => {
        expect(error).toBeInstanceOf(AppError);
        expect(error.message).toBe("User not found");
      });
  });

  test("should be failed because id is not a number", async () => {
    await expect(
      new DeleteUserService().execute(faker.datatype.uuid())
    ).rejects.toThrow();
  });
});
