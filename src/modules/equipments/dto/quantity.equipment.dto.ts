import { IsNumber, Min } from 'class-validator';

export class QuantityEquipmentDto {
  @IsNumber()
  @Min(1, { message: 'Quantity must be greater than 0' })
  quantity: number;
}
