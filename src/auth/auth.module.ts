import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalAuthStrategy } from './strategy/local.strategy';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy/jwt.strategy';
import { LoginValidationMiddleware } from './middlewares/login-validation.middleware';

@Module({
  imports: [UserModule, JwtModule.register({
    secret: process.env.SECRET,
    signOptions: {expiresIn: '3m'}
  })], //Preciso importar todos os modulos para conseguir usar um outro modulo
  controllers: [AuthController],
  providers: [AuthService, LocalAuthStrategy, JwtStrategy]
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoginValidationMiddleware).forRoutes('login');
  }
}
