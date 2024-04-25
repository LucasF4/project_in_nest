import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalAuthStrategy } from './strategy/local-auth.strategy';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [UserModule, JwtModule.register({
    secret: process.env.SECRET,
    signOptions: {expiresIn: '3600s'}
  })], //Preciso importar todos os modulos para conseguir usar um outro modulo
  controllers: [AuthController],
  providers: [AuthService, LocalAuthStrategy]
})
export class AuthModule {}
