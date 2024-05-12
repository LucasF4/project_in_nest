import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Req } from '@nestjs/common';
import { GastoService } from './gasto.service';
import { CreateGastoDto } from './dto/create-gasto.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UpdateGastoDto } from './dto/update-gasto.dto';
import { DeleteGastoDto } from './dto/delete-gasto.dto';

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
  getAllGastos(@Req() req){
    return this.gastoService.getAllGastos(req.user);
  }

  @Put()
  updateGasto(@Body() updateGasto: UpdateGastoDto, @Req() req){
    return this.gastoService.updateGasto(updateGasto, req.user);
  }

  @Delete()
  deleteGasto(@Body() deleteGasto: DeleteGastoDto, @Req() req){
    return this.gastoService.deleteGasto(deleteGasto, req.user);
  }
}
