import { createConnection, getConnection } from "typeorm";
import { CreateUserService } from "@services/user/CreateUserService";
import faker from "@faker-js/faker";
import { User } from "@entities/UserEntity";
import { ValidationError } from "@errors/ValidationError";

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

describe("Testing CreateUserService...", () => {
  
  test("must to be create a user with success", async () => {
    const createUserService = new CreateUserService();
    const user = await createUserService.execute({
      name: faker.name.findName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    } as User);
    expect(user).toBeInstanceOf(User);
    expect(typeof user.name).toBe("string");
    expect(typeof user.email).toBe("string");
    expect(typeof user.password).toBe("string");
    expect(user.createdAt).not.toBeNull();
    expect(user.updatedAt).not.toBeNull();
  });

  test("create user must to be failed", async () => {
    const createUserService = new CreateUserService();
    await createUserService
      .execute({
        name: faker.name.findName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
      } as User)
      .catch((error) => {
        expect(error).toBeInstanceOf(ValidationError);
        expect(error.message).toBe(
          "It's not possible to create or update the user"
        );
        expect(error.errors).not.toBeNull();
        expect(error.errors).toMatchObject({
          name: expect.any(Array),
          password: expect.any(Array),
        });
      });
  });

  test("should be failed because email is not valid address", async () => {
    const createUserService = new CreateUserService();
    await createUserService
      .execute({
        name: faker.name.findName(),
        email: "test@test",
        password: faker.internet.password(),
      } as User)
      .catch((error) => {
        expect(error).toBeInstanceOf(ValidationError);
        expect(error.message).toBe(
          "It's not possible to create or update the user"
        );
        expect(error.errors).not.toBeNull();
        expect(error.errors).toMatchObject({
          email: expect.arrayContaining([`email must be an email`]),
        });
      });
  });
  test("should be failed because email is already in use by other user", async () => {
    const createUserService = new CreateUserService();
    const user = await createUserService.execute({
      name: faker.name.findName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    } as User);

    await createUserService
      .execute({
        name: faker.name.findName(),
        email: user.email,
        password: faker.internet.password(),
      } as User)
      .catch((error) => {
        expect(error.errors).toMatchObject({
          email: expect.arrayContaining([
            `the email address "${user.email}" is already in use by other user`,
          ]),
        });
      });
  });
  test.todo("should be failed because the password is not safe");
});
