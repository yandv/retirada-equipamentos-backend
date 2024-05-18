import { Exclude } from 'class-transformer';

export class UserDto {
  id: string;

  fullName: string;

  email: string;
  cpf: string;

  @Exclude()
  password?: string;

  static fromEntity(user: Partial<UserDto>): UserDto | null {
    if (!user) return null;
    return Object.assign(new UserDto(), user);
  }
}
