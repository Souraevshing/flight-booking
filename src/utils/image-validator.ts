/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator';

export function IsImageFile(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isImageFile',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const acceptMimeTypes = [
            'image/png',
            'image/jpeg',
            'image/webp',
            'image/jpg',
          ];
          const fileType = acceptMimeTypes.find((type) => type === value);
          return !!fileType;
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} must be a valid image file (png, jpeg, webp)`;
        },
      },
    });
  };
}
