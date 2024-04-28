import { Controller, Get, Post, Body, Patch, Param, Delete, Req, HttpCode, HttpStatus } from '@nestjs/common';
import { SaldoService } from './saldo.service';
import { CreateSaldoDto } from './dto/create-saldo.dto';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@Controller()
export class SaldoController {
  constructor(private readonly saldoService: SaldoService) {}

  @ApiTags('Saldos')
  @Post('saldo')
  @HttpCode(HttpStatus.OK)
  async create(@Body() createSaldoDto: CreateSaldoDto, @Req() req) {
    //console.log(req.user)
    return this.saldoService.create(createSaldoDto, req.user);
  }

  @ApiTags("users")
  @Get('info')
  @HttpCode(HttpStatus.OK)
  getSaldo(@Req() req){
    return this.saldoService.getSaldo(req.user)
  }
}
