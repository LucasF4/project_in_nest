import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PrismaService } from './database/prisma.service';
import { LocalStrategy } from './auth/local.strategy';
import { AuthService } from './auth/auth.service';
import { LoginUser } from './dtos/create-member';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [PrismaService, AuthService, LocalStrategy],
})
export class AppModule {}
