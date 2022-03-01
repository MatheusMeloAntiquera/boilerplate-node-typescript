import { ErrorsValidationInterface } from "@errors/interfaces/ErrorsValidationInterface";
import { validate, ValidatorOptions } from "class-validator";

export class ValidationObjectHelper {
  private object: Object;
  private errors: ErrorsValidationInterface = {};
  constructor(object: Object) {
    this.object = object;
  }

  public async isValid(
    validatorOptions: ValidatorOptions = {
      skipMissingProperties: true,
    }
  ) {
    const errors = await validate(this.object, validatorOptions);
    if (errors.length > 0) {
      errors.forEach((error) => {
        if (error.constraints !== undefined) {
          this.errors[error.property] = Object.values(error.constraints);
        }
      });
      return false;
    }
    return true;
  }

  public getErrors(): ErrorsValidationInterface {
    return this.errors;
  }
}
