import {
  IsEnum,
  IsNotEmpty,
  IsNotEmptyObject,
  IsObject,
  IsUUID,
} from 'class-validator';
import { WorkflowType } from 'src/common/enums';

export class CreateFieldMappingDto {
  @IsUUID()
  @IsNotEmpty()
  workflowFieldId: string;

  @IsEnum(WorkflowType)
  @IsNotEmpty()
  targetType: WorkflowType;

  @IsObject()
  @IsNotEmptyObject({}, { message: 'target cannot be an empty object' })
  target?: Record<string, any>;
}
