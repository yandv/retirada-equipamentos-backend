import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { LoginResponse } from '../dto/login.dto';
import { UsersService } from '@/modules/users/users.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string): Promise<LoginResponse> {
    const user = await this.usersService.findByEmail(email);

    if (!user && user.password !== password) {
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
