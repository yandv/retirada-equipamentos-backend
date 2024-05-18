import { IsCpf } from '@/shared/domain/validator/cpf.validator';
import { IsEmail, IsString, Length, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(0, { message: 'Fullname must be not empty' })
  @MaxLength(255, { message: 'Fullname must be less than 255 characters' })
  fullName: string;

  @IsEmail()
  @MaxLength(255, { message: 'Email must be less than 255 characters' })
  email: string;

  @IsCpf()
  cpf: string;

  @IsString()
  @MinLength(8, { message: 'Password must be at least 8 characters' })
  password: string;
}
