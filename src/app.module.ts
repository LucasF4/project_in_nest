import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { SaldoModule } from './saldo/saldo.module';
import { SaldogastoModule } from './saldogasto/saldogasto.module';
import { GastoModule } from './gasto/gasto.module';
import { GanhosModule } from './ganhos/ganhos.module';

@Module({
  imports: [PrismaModule, UserModule, AuthModule, SaldoModule, SaldogastoModule, GastoModule, GanhosModule],
  controllers: [AppController],
  providers: [AppService, {
    provide: APP_GUARD,
    useClass: JwtAuthGuard
  }],
})
export class AppModule {}
