import { Module } from '@nestjs/common';
import { SaldogastoService } from './saldogasto.service';
import { SaldogastoController } from './saldogasto.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [SaldogastoController],
  providers: [SaldogastoService],
  exports:[SaldogastoService]
})
export class SaldogastoModule {}
