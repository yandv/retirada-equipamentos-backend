import {
  Controller,
  Request,
  Get,
  Post,
  UseGuards,
  Body,
} from '@nestjs/common';
import { IsPublic } from '@/modules/users/decorators/is-public.decorator';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { ThrottlerGuard } from '@nestjs/throttler';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTooManyRequestsResponse,
} from '@nestjs/swagger';
import { LoginResponse } from './dto/login.dto';

@Controller('users')
export class AuthController {
  @Post('login')
  @IsPublic()
  @ApiOperation({
    description: 'This endpoint is used to login with email and password.',
  })
  @ApiResponse({
    status: 200,
    description: 'Your login has been successfully completed.',
    type: LoginResponse,
  })
  @ApiResponse({
    status: 403,
    description: 'Bad Request',
  })
  @ApiResponse({
    status: 401,
    description: 'Wrong email or password.',
  })
  @ApiResponse({
    status: 429,
    description: 'Too many requests, try again later.',
  })
  @UseGuards(LocalAuthGuard, ThrottlerGuard)
  async login(@Request() req) {
    return req.user;
  }

  @Get('profile')
  @ApiOperation({
    description: 'This endpoint is used to get the user profile.',
  })
  @ApiResponse({
    status: 200,
    description: 'The user profile has been successfully retrieved.',
  })
  @ApiResponse({
    status: 401,
    description: 'Bearer token is invalid or not provided.',
  })
  @ApiBearerAuth()
  async profile(@Request() req) {
    return req.user;
  }
}
