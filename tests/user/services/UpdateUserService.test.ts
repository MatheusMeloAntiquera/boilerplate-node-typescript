import { createConnection, getConnection, getCustomRepository } from "typeorm";
import faker from "@faker-js/faker";
import { User } from "@entities/UserEntity";
import { ValidationError } from "@errors/ValidationError";
import { UserFactory } from "@factories/UserFactory";
import { UpdateUserService } from "@services/user/UpdateUserService";
import { UserRepository } from "@repositories/UserRepository";
import { AppError } from "@errors/AppError";

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

describe("Testing UpdateUserService...", () => {
  const userFactory = new UserFactory();
  test("must to be update a user with success", async () => {
    const userRepository = getCustomRepository(UserRepository);
    const user = await userRepository.save(await userFactory.create());

    const updateUserService = new UpdateUserService();
    const newUserData = await userFactory.create();
    const updatedUser = await updateUserService.execute(newUserData);

    expect(updatedUser).toBeInstanceOf(User);
    expect(updatedUser.name).toEqual(newUserData.name);
    expect(updatedUser.email).toEqual(newUserData.email);
    expect(updatedUser.password).toEqual(newUserData.password);
    //createdAt should not to be change
    expect(updatedUser.createdAt).toEqual(user.createdAt);
    //updateAdt must to be change
    expect(updatedUser.updatedAt).not.toEqual(user.updatedAt);
  });

  test("updating user must to be failed because all values are wrong", async () => {
    const userRepository = getCustomRepository(UserRepository);
    const user = await userRepository.save(await userFactory.create());

    const updateUserService = new UpdateUserService();
    await updateUserService
      .execute({
          id: user.id,
          name: '',
          email: "test@test",
          password: "",
      } as User)
      .catch((error) => {
        expect(error).toBeInstanceOf(ValidationError);
        expect(error.message).toBe(
          "It's not possible to create or update the user"
        );
        expect(error.errors).not.toBeNull();
        expect(error.errors).toMatchObject({
          name: expect.any(Array),
          email: expect.arrayContaining([`email must be an email`]),
          password: expect.any(Array),
        });
      });
  });

  test("should be failed because user not found", async () => {
    const user = await userFactory.create();
    user.id = faker.datatype.number();
    await new UpdateUserService()
      .execute(user)
      .catch((error) => {
        expect(error).toBeInstanceOf(AppError);
        expect(error.message).toBe("User not found");
      });
  });
  test.todo("should be failed because the password is not safe");
});
