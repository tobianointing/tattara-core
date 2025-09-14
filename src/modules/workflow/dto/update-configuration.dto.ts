import {
  IsBoolean,
  IsEnum,
  IsObject,
  IsOptional,
  IsUUID,
} from 'class-validator';
import { WorkflowType } from 'src/common/enums';

export class UpdateConfigurationDto {
  @IsUUID()
  @IsOptional()
  id?: string;

  @IsEnum(WorkflowType)
  @IsOptional()
  type?: WorkflowType;

  @IsObject()
  @IsOptional()
  configuration?: Record<string, any>;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
