import { Controller, Get, Post, Body, Patch, Param, Delete, Req, HttpCode, HttpStatus } from '@nestjs/common';
import { SaldoService } from './saldo.service';
import { CreateSaldoDto } from './dto/create-saldo.dto';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';

@Controller('saldo')
export class SaldoController {
  constructor(private readonly saldoService: SaldoService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  async create(@Body() createSaldoDto: CreateSaldoDto, @Req() req) {
    //console.log(req.user)
    return this.saldoService.create(createSaldoDto, req.user);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  getSaldo(@Req() req){
    return this.saldoService.getSaldo(req.user)
  }
}
