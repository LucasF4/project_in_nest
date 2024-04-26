import { Module } from '@nestjs/common';
import { SaldoService } from './saldo.service';
import { SaldoController } from './saldo.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { SaldogastoModule } from 'src/saldogasto/saldogasto.module';

@Module({
  imports: [PrismaModule, SaldogastoModule],
  controllers: [SaldoController],
  providers: [SaldoService],
})
export class SaldoModule {}
