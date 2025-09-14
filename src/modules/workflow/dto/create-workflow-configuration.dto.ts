import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNotEmptyObject,
  IsObject,
  IsOptional,
} from 'class-validator';
import { WorkflowType } from 'src/common/enums';

export class CreateWorkflowConfigurationDto {
  @IsEnum(WorkflowType)
  @IsNotEmpty()
  type: WorkflowType;

  @IsObject()
  @IsNotEmptyObject({}, { message: 'Configuration cannot be an empty object' })
  configuration: Record<string, any>;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
