import { IsCpf } from '@/shared/domain/validator/cpf.validator';
import {
  IsEmail,
  IsNumber,
  IsString,
  Length,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class CreateEquipmentDto {
  @IsString()
  @MinLength(0, { message: 'Fullname must be not empty' })
  @MaxLength(255, { message: 'Fullname must be less than 255 characters' })
  equipmentName: string;

  @IsNumber()
  @Min(0, { message: 'Stock must be greater than or equal to 0' })
  stock: number;
}
