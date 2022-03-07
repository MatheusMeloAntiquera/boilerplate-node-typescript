import { getConnection } from "typeorm";
export default async function (): Promise<void> {
  await getConnection().close();
}