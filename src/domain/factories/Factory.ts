export abstract class Factory<T> {
  public abstract create(data?: T): Promise<T>;
}
