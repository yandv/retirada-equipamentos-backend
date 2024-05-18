import { UsersService } from '@/modules/users/users.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  async login(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);

    if (!user || user.password !== password) {
      throw new HttpException(
        'Email or password is incorrect, try again.',
        HttpStatus.UNAUTHORIZED,
      );
    }
    
    return {
      user,
      accessToken: await this.jwtService.signAsync({ id: user.id }),
    };
  }
}
