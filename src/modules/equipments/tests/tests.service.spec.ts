import { Test, TestingModule } from '@nestjs/testing';

import { EquipmentsService } from '../equipments.service';
import { PrismaService } from '../../../shared/infrastructure/prisma/prisma.service';
import { CreateEquipmentDto } from '../dto/create-equipment.dto';
import { Equipment } from '../../../shared/domain/entities/equipment.entity';

describe('usersService', () => {
  let equipmentsService: EquipmentsService;

  let findManyMock = jest.fn();
  let findUniqueMock = jest.fn();
  let createMock = jest.fn();
  let deleteMock = jest.fn();
  let updateMock = jest.fn();

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        EquipmentsService,
        {
          provide: PrismaService,
          useValue: {
            equipment: {
              findMany: findManyMock,
              findUnique: findUniqueMock,
              create: createMock,
              delete: deleteMock,
              update: updateMock,
            },
          },
        },
      ],
    }).compile();

    equipmentsService = moduleRef.get<EquipmentsService>(EquipmentsService);
  });

  describe('getEquipments', () => {
    it('should return an array of equipments', async () => {
      const returnMock: Equipment[] = [
        {
          id: '1',
          equipmentName: 'John Doe',
          stock: 10,
          creatorId: '1',
        },
      ];
      findManyMock.mockResolvedValue(returnMock);
      expect(
        await equipmentsService.getEquipments({ page: 1, itemsPerPage: 10 }),
      ).toEqual(returnMock);
    });
  });

  describe('getEquipmentById', () => {
    it('should return an array of equipments', async () => {
      const returnMock = {
        id: '1',
        equipmentName: 'John Doe',
        stock: 10,
        creatorId: '1',
      };

      findUniqueMock.mockResolvedValue(returnMock);

      expect(await equipmentsService.getEquipmentsById('1')).toEqual(
        returnMock,
      );
    });
  });

  describe('createEquipment', () => {
    it('should return the created equipment', async () => {
      const createEquipmentDto: CreateEquipmentDto = {
        equipmentName: 'Equipamento Genérico 1',
        stock: 10,
      };
      const result: Equipment = {
        id: '1',
        creatorId: '1',
        ...createEquipmentDto,
      };

      createMock.mockResolvedValue(result);
      expect(
        await equipmentsService.createEquipment('1', createEquipmentDto),
      ).toEqual(result);
    });
  });
});
