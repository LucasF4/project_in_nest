import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SaldogastoService } from './saldogasto.service';
import { CreateSaldogastoDto } from './dto/create-saldogasto.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('saldogasto')
export class SaldogastoController {
  constructor(private readonly saldogastoService: SaldogastoService) {}

  @ApiTags('Saldos e Ganhos')
  @Post()
  create(@Body() createSaldogastoDto: CreateSaldogastoDto) {
    //return this.saldogastoService.create();
  }
}
