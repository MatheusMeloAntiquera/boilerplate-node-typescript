import { createConnection, getCustomRepository } from "typeorm";
import faker from "@faker-js/faker";
import { User } from "@entities/UserEntity";
import { ValidationError } from "@errors/ValidationError";
import { UserFactory } from "@factories/UserFactory";
import { UpdateUserService } from "@services/user/UpdateUserService";
import { UserRepository } from "@repositories/UserRepository";
import { AppError } from "@errors/AppError";
import cleanDatabase from "@tests/scripts/cleanDatabase";
import closeConnection from "@tests/scripts/closeConnection";

let userFactory: UserFactory;
let updateUserService: UpdateUserService;
let userRepository: UserRepository;

beforeAll(async () => {
  await createConnection();
  await cleanDatabase();
  userFactory = new UserFactory();
  updateUserService = new UpdateUserService();
  userRepository = getCustomRepository(UserRepository);
});

afterAll(async () => {
  await closeConnection();
});

describe("Testing UpdateUserService...", () => {
  test("must to be update a user with success", async () => {
    const user = await userRepository.save(await userFactory.create());

    
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
    const user = await userRepository.save(await userFactory.create());
    await updateUserService
      .execute({
        id: user.id,
        name: "",
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
    await new UpdateUserService().execute(user).catch((error) => {
      expect(error).toBeInstanceOf(AppError);
      expect(error.message).toBe("User not found");
    });
  });
  test.todo("should be failed because the password is not safe");
});
