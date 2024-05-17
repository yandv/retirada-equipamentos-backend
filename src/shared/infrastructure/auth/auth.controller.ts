import {
  Controller,
  Request,
  Get,
  Post,
  UseGuards,
  Body,
} from '@nestjs/common';
import { IsPublic } from '@/shared/domain/decorators/is-public.decorator';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { ThrottlerGuard } from '@nestjs/throttler';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTooManyRequestsResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { LoginResponse } from './dto/login.dto';

@Controller('users')
export class AuthController {
  @Post('login')
  @IsPublic()
  @ApiOperation({
    description: 'This endpoint is used to login with email and password.',
  })
  @ApiOkResponse({
    description: 'Your login has been successfully completed.',
    type: LoginResponse,
  })
  @ApiBadRequestResponse({
    description: 'Bad Request',
  })
  @ApiUnauthorizedResponse({
    description: 'Wrong email or password.',
  })
  @ApiTooManyRequestsResponse({
    description:
      'Too many requests, try again later. The rate limit is defined in environment variables.',
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
