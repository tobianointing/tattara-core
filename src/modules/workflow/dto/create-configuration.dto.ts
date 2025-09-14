import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNotEmptyObject,
  IsObject,
  IsOptional,
} from 'class-validator';
import { WorkflowType } from 'src/common/enums';

export class CreateConfigurationDto {
  @IsEnum(WorkflowType)
  @IsNotEmpty()
  type: WorkflowType;

  @IsObject()
  @IsNotEmptyObject({}, { message: 'configuration cannot be an empty object' })
  configuration: Record<string, any>;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
