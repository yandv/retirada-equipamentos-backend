import { Test, TestingModule } from '@nestjs/testing';

import { UsersController } from '../users.controller';
import { UsersService } from '../users.service';
import { PrismaService } from '../../../shared/infrastructure/prisma/prisma.service';
import { UserDto } from '../dto/user.dto';
import { CreateUserDto } from '../dto/create-user.dto';

describe('UsersController', () => {
  let usersController: UsersController;
  let usersService: UsersService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [UsersController],
      providers: [UsersService, PrismaService],
    }).compile();

    usersController = moduleRef.get<UsersController>(UsersController);
    usersService = moduleRef.get<UsersService>(UsersService);
  });

  describe('getUsers', () => {
    it('should return an array of users', async () => {
      const result: UserDto[] = [
        {
          id: '1',
          fullName: 'John Doe',
          email: 'john@doe.com',
          cpf: '123456789',
        },
      ];
      jest.spyOn(usersService, 'getUsers').mockResolvedValue(result);

      expect(await usersController.getUsers(1, 10)).toBe(result);
    });
  });

  describe('getUserById', () => {
    it('should return an array of users', async () => {
      const result: UserDto = {
        id: '1',
        fullName: 'John Doe',
        email: 'john@doe.com',
        cpf: '123456789',
      };

      jest.spyOn(usersService, 'getUserById').mockResolvedValue(result);

      expect(await usersController.getUserById('1')).toBe(result);
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

      jest.spyOn(usersService, 'createUser').mockResolvedValue(result);
      expect(await usersController.createUser(createUserDto)).toBe(result);
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

      jest.spyOn(usersService, 'updateUser').mockResolvedValue(result);
      expect(await usersController.updateUser('1', updateUserDto)).toBe(result);
    });
  });

  describe('deleteUser', () => {
    let deleteUserByIdSpy = jest.fn();

    beforeEach(() => {
      jest
        .spyOn(usersService, 'deleteUserById')
        .mockImplementation(deleteUserByIdSpy);
    });

    it('should return the deleted user', async () => {
      await usersController.deleteUserById('1');
      expect(deleteUserByIdSpy).toHaveBeenCalledWith('1');
    });
  });
});
