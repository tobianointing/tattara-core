import { IsString, IsObject, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import type { ExternalConnectionConfiguration } from '../interfaces/connection-config.interface';

export class ConnectionDto {
  @IsString()
  type!: string;

  @IsObject()
  config!: ExternalConnectionConfiguration;
}

export class PushDataDto {
  @ValidateNested()
  @Type(() => ConnectionDto)
  connection!: ConnectionDto;

  @IsObject()
  payload!: any;
}
