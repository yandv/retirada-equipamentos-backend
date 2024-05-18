import { Paginable } from '@/shared/domain/@types/paginable';
import { Equipment } from '@/shared/domain/entities/equipment.entity';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateEquipmentDto } from './dto/create-equipment.dto';
import { PrismaService } from '@/shared/infrastructure/prisma/prisma.service';
import { QuantityEquipmentDto } from './dto/quantity.equipment.dto';

@Injectable()
export class EquipmentsService {
  constructor(private readonly prisma: PrismaService) {}

  getEquipments(paginable: Paginable): Promise<Equipment[]> {
    return this.prisma.equipment.findMany({
      skip: paginable.itemsPerPage * (paginable.page - 1),
      take: paginable.itemsPerPage,
    });
  }

  getEquipmentsById(id: string) {
    return this.prisma.equipment.findUnique({
      where: { id },
    });
  }

  createEquipment(creatorId: string, createEquipmentDto: CreateEquipmentDto) {
    return this.prisma.equipment.create({
      data: {
        ...createEquipmentDto,
        creatorId,
      },
    });
  }

  consumeEquipment(id: string, consumeEquipmentDto: QuantityEquipmentDto) {
    const { quantity } = consumeEquipmentDto;

    return this.prisma.$transaction(async (tx) => {
      const equipment = await tx.equipment.findUnique({
        where: { id },
      });

      if (!equipment) {
        throw new HttpException('Equipment not found', HttpStatus.NOT_FOUND);
      }

      if (equipment.stock < quantity) {
        throw new HttpException(
          'There is not enough quantity to consume',
          HttpStatus.BAD_REQUEST,
        );
      }

      await tx.equipment.update({
        where: { id },
        data: {
          stock: equipment.stock - quantity,
        },
      });

      return {
        ...equipment,
        stock: equipment.stock - quantity,
      };
    });
  }

  addEquipment(id: string, consumeEquipmentDto: QuantityEquipmentDto) {
    const { quantity } = consumeEquipmentDto;

    return this.prisma.$transaction(async (tx) => {
      const equipment = await tx.equipment.findUnique({
        where: { id },
      });

      if (!equipment) {
        throw new HttpException('Equipment not found', HttpStatus.NOT_FOUND);
      }

      await tx.equipment.update({
        where: { id },
        data: {
          stock: equipment.stock + quantity,
        },
      });

      return {
        ...equipment,
        stock: equipment.stock + quantity,
      };
    });
  }
}
