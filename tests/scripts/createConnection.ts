import { createConnection } from "typeorm";

export default async function (): Promise<void> {
  await createConnection();
}
