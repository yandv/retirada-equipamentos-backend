import { Paginable } from '@/shared/domain/@types/paginable';
import { User } from '@/shared/domain/entities/user.entity';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserDto } from './dto/user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

const usersMock: User[] = [
  {
    id: 1,
    fullName: 'John Doe',
    email: 'john@doe.com',
    cpf: '123.456.789-00',
    password: '12345678',
  },
  {
    id: 2,
    fullName: 'Jane Doe',
    email: 'jane@doe.com',
    cpf: '987.654.321-00',
    password: '87654321',
  },
];

@Injectable()
export class UsersService {
  findByEmail(email: string) {
    return UserDto.fromEntity(usersMock.find((user) => user.email === email));
  }

  getUsers(paginable: Paginable) {
    return usersMock
      .slice(
        (paginable.page - 1) * paginable.itemsPerPage,
        paginable.page * paginable.itemsPerPage,
      )
      .map((user) => UserDto.fromEntity(user));
  }

  getUserById(id: number) {
    return UserDto.fromEntity(usersMock.find((user) => user.id === id));
  }

  createUser(createUserDto: CreateUserDto) {
    const newUser: User = {
      id: usersMock.length + 1,
      ...createUserDto,
    };
    usersMock.push(newUser);
    return UserDto.fromEntity(newUser);
  }

  updateUser(id: number, user: UpdateUserDto) {
    const userIndex = usersMock.findIndex((user) => user.id === id);
    if (userIndex === -1) {
      return null;
    }
    usersMock[userIndex] = {
      ...usersMock[userIndex],
      ...user,
    };
    return UserDto.fromEntity(user);
  }

  updatePartialUser(id: number, partialUser: Partial<User>) {
    const user = usersMock.find((user) => user.id === id);
    if (!user) {
      return null;
    }
    Object.assign(user, partialUser);
    return UserDto.fromEntity(user);
  }
}
