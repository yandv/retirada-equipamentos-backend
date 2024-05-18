import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';

export class UpdatePartialUserDto extends PartialType(CreateUserDto) {}

export class UpdateUserDto extends CreateUserDto {}