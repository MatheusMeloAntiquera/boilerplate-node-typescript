import { AppErrorInterface } from "./interfaces/AppErrorInterface";

export class AppError implements Error, AppErrorInterface {
  public readonly name: string = "AppError";
  public readonly message: string;
  public readonly statusCode: number;
  constructor(message: string, statusCode = 500) {
    this.message = message;
    this.statusCode = statusCode;
  }

  public toJson() {
    return {
      success: false,
      message: this.message,
    };
  }
}
