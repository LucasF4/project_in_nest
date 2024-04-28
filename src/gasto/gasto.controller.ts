import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { GastoService } from './gasto.service';
import { CreateGastoDto } from './dto/create-gasto.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Gastos')
@ApiBearerAuth()
@Controller('gasto')
export class GastoController {
  constructor(private readonly gastoService: GastoService) {}

  @Post()
  create(@Body() createGastoDto: CreateGastoDto, @Req() req) {
    return this.gastoService.create(createGastoDto, req.user);
  }

  @Get()
  getAllGastos(){
    return this.gastoService.getAllGastos();
  }
}
