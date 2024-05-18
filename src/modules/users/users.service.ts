import { Paginable } from '@/shared/domain/@types/paginable';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserDto } from './dto/user.dto';
import { UpdatePartialUserDto, UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '@/shared/infrastructure/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  findByEmail(email: string) {
    return this.prisma.user
      .findUnique({
        where: { email },
      })
      .then(UserDto.fromEntity);
  }

  getUsers(paginable: Paginable) {
    return this.prisma.user
      .findMany({
        skip: paginable.itemsPerPage * (paginable.page - 1),
        take: paginable.itemsPerPage,
      })
      .then((users) => users.map(UserDto.fromEntity));
  }

  getUserById(id: string) {
    return this.prisma.user
      .findUnique({
        where: { id },
      })
      .then(UserDto.fromEntity);
  }

  createUser(createUserDto: CreateUserDto) {
    return this.prisma.user
      .create({
        data: createUserDto,
      })
      .then(UserDto.fromEntity);
  }

  deleteUserById(id: string) {
    return this.prisma.user
      .delete({
        where: { id },
      })
      .then(UserDto.fromEntity);
  }

  updateUser(id: string, updateUserDto: UpdateUserDto) {
    return this.prisma.user
      .update({
        where: { id },
        data: updateUserDto,
      })
      .then(UserDto.fromEntity);
  }

  updatePartialUser(id: string, partialUser: UpdatePartialUserDto) {
    return this.prisma.user
      .update({
        where: { id },
        data: partialUser,
      })
      .then(UserDto.fromEntity);
  }
}
