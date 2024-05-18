import { Test, TestingModule } from '@nestjs/testing';

import { UsersService } from '../users.service';
import { PrismaService } from '../../../shared/infrastructure/prisma/prisma.service';
import { UserDto } from '../dto/user.dto';
import { CreateUserDto } from '../dto/create-user.dto';

describe('usersService', () => {
  let usersService: UsersService;

  let findManyMock = jest.fn();
  let findUniqueMock = jest.fn();
  let createMock = jest.fn();
  let deleteMock = jest.fn();
  let updateMock = jest.fn();

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        UsersService,
        {
          provide: PrismaService,
          useValue: {
            user: {
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

    usersService = moduleRef.get<UsersService>(UsersService);
  });

  describe('getUsers', () => {
    it('should return an array of users', async () => {
      const returnMock = [
        {
          id: '1',
          fullName: 'John Doe',
          email: 'john@doe.com',
          cpf: '123456789',
        },
      ];
      findManyMock.mockResolvedValue(returnMock);
      expect(
        await usersService.getUsers({ page: 1, itemsPerPage: 10 }),
      ).toEqual(returnMock);
    });
  });

  describe('getUserById', () => {
    it('should return an array of users', async () => {
      const returnMock = {
        id: '1',
        fullName: 'John Doe',
        email: 'john@doe.com',
        cpf: '123456789',
      };

      findUniqueMock.mockResolvedValue(returnMock);

      expect(await usersService.getUserById('1')).toEqual(returnMock);
    });
  });

  describe('createUser', () => {
    it('should return the created user', async () => {
      const createUserDto: CreateUserDto = {
        fullName: 'John Doe',
        email: 'john@doe.com',
        cpf: '123456789',
        password: '123456',
      };
      const result: UserDto = {
        id: '1',
        ...createUserDto,
      };

      createMock.mockResolvedValue(result);
      expect(await usersService.createUser(createUserDto)).toEqual(result);
    });
  });

  describe('updateUser', () => {
    it('should return the updated user', async () => {
      const updateUserDto: CreateUserDto = {
        fullName: 'John Doe',
        email: 'john@doe.com',
        cpf: '123456789',
        password: '123456',
      };

      const result: UserDto = {
        id: '1',
        ...updateUserDto,
      };

      updateMock.mockResolvedValue(result);
      expect(await usersService.updateUser('1', updateUserDto)).toEqual(result);
    });
  });

  describe('deleteUser', () => {
    it('should return the deleted user', async () => {
      deleteMock.mockResolvedValue({ id: '1' });
      await usersService.deleteUserById('1');
      expect(deleteMock).toHaveBeenCalled();
    });
  });
});
