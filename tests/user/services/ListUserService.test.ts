import { getCustomRepository } from "typeorm";
import { ListUserService } from "@services/user/ListUserService";
import { UserRepository } from "@repositories/UserRepository";
import { UserFactory } from "@factories/UserFactory";
import createConnection from "@tests/scripts/createConnection";
import cleanDatabase from "@tests/scripts/cleanDatabase";
import closeConnection from "@tests/scripts/closeConnection";

let listUserService: ListUserService;
beforeAll(async () => {
  await createConnection();
  await cleanDatabase();
  listUserService = new ListUserService();
});

afterAll(async () => {
  await closeConnection();
});

describe("Testing ListUserService...", () => {
  test("must to be return an empty user array", async () => {
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

    const users = await listUserService.execute();
    expect(users).toHaveLength(3);
  });
});
