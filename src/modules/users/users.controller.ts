import { Controller, Get, Request } from '@nestjs/common';

@Controller('users')
export class UsersController {
  @Get('/')
  getUsers(@Request() req) {
    return req.user;
  }
}
