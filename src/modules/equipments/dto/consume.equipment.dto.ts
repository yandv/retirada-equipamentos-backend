import { IsNumber, Min } from 'class-validator';

export class ConsumeEquipmentDto {
  @IsNumber()
  @Min(1, { message: 'Quantity must be greater than 0' })
  quantity: number;
}
