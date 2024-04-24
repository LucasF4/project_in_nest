import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalAuthStrategy } from './strategy/local-auth.strategy';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [UserModule], //Preciso importar todos os modulos para conseguir usar um outro modulo
  controllers: [AuthController],
  providers: [AuthService, LocalAuthStrategy]
})
export class AuthModule {}
