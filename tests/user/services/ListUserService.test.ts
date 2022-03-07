import { createConnection, getConnection, getCustomRepository } from "typeorm";
import { ListUserService } from "@services/user/ListUserService";
import { UserRepository } from "@repositories/UserRepository";
import faker from "@faker-js/faker";
import { UserFactory } from "@factories/UserFactory";

beforeAll(async () => {
  await createConnection();
  const entities = getConnection().entityMetadatas;
  for (const entity of entities) {
    const repository = getConnection().getRepository(entity.name); // Get repository
    await repository.clear(); // Clear each entity table's content
  }
});

describe("Testing ListUserService...", () => {
  test("must to be return an empty user array", async () => {
    const listUserService = new ListUserService();
    const users = await listUserService.execute();
    expect(users).toEqual([]);
  });

  test("must to be return three users", async () => {
    const userRepository = getCustomRepository(UserRepository);
    const userFactory = new UserFactory();
    await userRepository.insert([
      await userFactory.create(),
      await userFactory.create(),
      await userFactory.create(),
    ]);

    const listUserService = new ListUserService();
    const users = await listUserService.execute();
    expect(users).toHaveLength(3);
  });
});
