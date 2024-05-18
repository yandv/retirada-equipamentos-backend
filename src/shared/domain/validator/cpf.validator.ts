import {
  ValidationOptions,
  registerDecorator,
  ValidationArguments,
} from 'class-validator';

export function IsCpf(validationOptions?: ValidationOptions) {
  return function (object: Record<string, any>, propertyName: string): void {
    registerDecorator({
      name: 'isCpf',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments): boolean {
          return isCpf(value);
        },
        defaultMessage(args: ValidationArguments): string {
          return `${args.property} must be a cpf`;
        },
      },
    });
  };
}

export function isCpf(value: string): boolean {
  if (!value) return false

  if (typeof value !== 'string') return false

  return /^[0-9]{3}\.?[0-9]{3}\.?[0-9]{3}\-?[0-9]{2}$/.test(value)
}
