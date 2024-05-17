import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { LoginResponse } from '../dto/login.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private readonly jwtService: JwtService) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string): Promise<LoginResponse> {
    if (email !== 'admin@email.com' || password !== 'password') {
      throw new HttpException(
        'Email or password is incorrect, try again.',
        HttpStatus.UNAUTHORIZED,
      );
    }
    return {
      user: {
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
      },
      accessToken: await this.jwtService.signAsync({ id: 1 }),
    };
  }
}
