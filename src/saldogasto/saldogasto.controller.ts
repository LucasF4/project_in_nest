import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SaldogastoService } from './saldogasto.service';
import { CreateSaldogastoDto } from './dto/create-saldogasto.dto';

@Controller('saldogasto')
export class SaldogastoController {
  constructor(private readonly saldogastoService: SaldogastoService) {}

  @Post()
  create(@Body() createSaldogastoDto: CreateSaldogastoDto) {
    //return this.saldogastoService.create();
  }
}
