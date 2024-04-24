import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PrismaService } from './database/prisma.service';
import { LocalStrategy } from './auth/local.strategy';
import { AuthService } from './auth/auth.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [JwtModule.register({
    secret: process.env.JWT_SECRET,
    signOptions: {expiresIn: '3600s'}
  })],
  controllers: [AppController],
  providers: [PrismaService, AuthService, LocalStrategy],
})
export class AppModule {}
