import { Paginable } from '@/shared/domain/@types/paginable';
import { Equipment } from '@/shared/domain/entities/equipment.entity';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateEquipmentDto } from './dto/create-equipment.dto';
import { ConsumeEquipmentDto } from './dto/consume.equipment.dto';

const usersMock: Equipment[] = [
  {
    id: 1,
    equipmentName: 'Equipamento Genérico 1',
    stock: 5,
    creatorId: 1,
  },
  {
    id: 2,
    equipmentName: 'Equipamento Genérico 2',
    stock: 3,
    creatorId: 1,
  },
];

@Injectable()
export class EquipmentsService {
  getEquipments(paginable: Paginable) {
    return usersMock
      .slice(
        (paginable.page - 1) * paginable.itemsPerPage,
        paginable.page * paginable.itemsPerPage,
      )
      .map((equipment) => equipment);
  }

  getEquipmentsById(id: number) {
    return usersMock.find((equipment) => equipment.id === id);
  }

  createEquipment(creatorId: number, createEquipmentDto: CreateEquipmentDto) {
    const newEquipment = {
      id: usersMock.length + 1,
      creatorId,
      ...createEquipmentDto,
    };
    usersMock.push(newEquipment);
    return newEquipment;
  }

  consumeEquipment(quantity: ConsumeEquipmentDto) {
    const equipment = usersMock.find(
      (equipment) => equipment.id === quantity.id,
    );
    if (!equipment)
      throw new HttpException('Equipment not found', HttpStatus.NOT_FOUND);
    if (equipment.stock < quantity.quantity)
      throw new HttpException('Insufficient stock', HttpStatus.BAD_REQUEST);
    equipment.stock -= quantity.quantity;
    return equipment;
  }
}
