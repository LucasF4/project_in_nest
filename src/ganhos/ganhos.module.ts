import { Module } from '@nestjs/common';
import { GanhosService } from './ganhos.service';
import { GanhosController } from './ganhos.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [GanhosController],
  providers: [GanhosService],
})
export class GanhosModule {}
