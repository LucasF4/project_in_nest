import { PartialType } from '@nestjs/mapped-types';
import { CreateSaldogastoDto } from './create-saldogasto.dto';

export class UpdateSaldogastoDto extends PartialType(CreateSaldogastoDto) {}
