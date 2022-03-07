import { User } from "@entities/UserEntity";
import { Factory } from "@factories/Factory";
import faker from "@faker-js/faker";

interface InterfaceUserFactory {
  name?: string;
  email?: string;
  password?: string;
}

export class UserFactory extends Factory<User> {
  public async create({ name, email, password }: InterfaceUserFactory = {}) {
    const user = new User();
    user.name = name || faker.name.findName();
    user.email = email || faker.internet.email();
    user.password = password || faker.internet.password();
    return user;
  }
}
