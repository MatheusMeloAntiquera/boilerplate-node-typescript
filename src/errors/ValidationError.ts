import { AppError } from "./AppError";
import { ErrorsValidationInterface } from "@errors/interfaces/ErrorsValidationInterface";

export class ValidationError extends AppError {
  public readonly errors: ErrorsValidationInterface;
  constructor(
    message: string,
    errors: ErrorsValidationInterface,
    statusCode = 400
  ) {
    super(message, statusCode);
    this.errors = errors;
  }

  public toJson() {
    return {
      success: false,
      message: this.message,
      errors: this.errors,
    };
  }
}
