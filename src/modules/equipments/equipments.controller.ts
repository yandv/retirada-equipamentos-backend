import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  Query,
  Request,
} from '@nestjs/common';
import { EquipmentsService } from './equipments.service';
import { CreateEquipmentDto } from './dto/create-equipment.dto';
import { QuantityEquipmentDto } from './dto/quantity.equipment.dto';

@Controller('equipments')
export class EquipmentsController {
  constructor(private readonly equipmentService: EquipmentsService) {}
  @Get('/')
  getEqupments(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('itemsPerPage', new DefaultValuePipe(10), ParseIntPipe)
    itemsPerPage: number,
  ) {
    return this.equipmentService.getEquipments({ page, itemsPerPage });
  }

  @Get('/:id')
  getEquipmentById(@Param('id') id: string) {
    return this.equipmentService.getEquipmentsById(id);
  }

  @Post('/')
  createEquipment(
    @Request() req,
    @Body() createEquipmentDto: CreateEquipmentDto,
  ) {
    return this.equipmentService.createEquipment(
      req.user.id,
      createEquipmentDto,
    );
  }

  @Patch('/retirar/:id')
  consumeEquipment(
    @Param('id') id: string,
    @Body() quantity: QuantityEquipmentDto,
  ) {
    return this.equipmentService.consumeEquipment(id, quantity);
  }

  @Patch('/adicionar/:id')
  addEquipment(
    @Param('id') id: string,
    @Body() quantity: QuantityEquipmentDto,
  ) {
    return this.equipmentService.addEquipment(id, quantity);
  }
}
