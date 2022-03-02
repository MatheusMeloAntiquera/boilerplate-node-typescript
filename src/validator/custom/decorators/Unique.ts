import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from "class-validator";
import { getRepository } from "typeorm";

export function Unique(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: "unique",
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        async validate(value: any, _args: ValidationArguments) {
          const repository = getRepository(object.constructor);
          const record = await repository.findOne({ [propertyName]: value });
          return record == undefined;
        },
        defaultMessage(_args: ValidationArguments) {
          return `the $property "$value" is already in use`;
        },
      },
    });
  };
}
