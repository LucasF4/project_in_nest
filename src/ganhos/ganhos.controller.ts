import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Put } from '@nestjs/common';
import { GanhosService } from './ganhos.service';
import { CreateGanhoDto } from './dto/create-ganho.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UpdateGanhoDto } from './dto/update-ganho.dto';
import { DeleteGanhoDto } from './dto/delete-ganho.dto';

@ApiTags('Ganhos')
@ApiBearerAuth()
@Controller('ganhos')
export class GanhosController {
  constructor(private readonly ganhosService: GanhosService) {}

  @Post()
  create(@Body() createGanhoDto: CreateGanhoDto, @Req() req) {
    return this.ganhosService.create(createGanhoDto, req.user);
  }

  @Get()
  getAll(@Req() req){
    return this.ganhosService.getGanhos(req.user);
  }

  @Put()
  update(@Body() updateGanhoDto: UpdateGanhoDto, @Req() req){
    return this.ganhosService.editGanhos(updateGanhoDto, req.user)
  }

  @Delete()
  delete(@Body() deleteGanho: DeleteGanhoDto, @Req() req){
    return this.ganhosService.deleteGanho(deleteGanho, req.user)
  }
}
