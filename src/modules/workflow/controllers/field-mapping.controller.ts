import { Body, Controller, Param, ParseUUIDPipe, Put } from '@nestjs/common';
import { Roles } from 'src/common/decorators';
import { UpsertFieldMappingsDto } from '../dto';
import { FieldMappingService } from '../services/field-mapping.service';

@Controller('workflows')
export class FieldMappingController {
  constructor(private readonly fieldMappingService: FieldMappingService) {}

  @Put('/:workflowId/field-mappings/upsert')
  @Roles('admin')
  async upsertFieldMappings(
    @Param('workflowId', new ParseUUIDPipe()) workflowId: string,
    @Body()
    dto: UpsertFieldMappingsDto,
  ) {
    await this.fieldMappingService.upsertFieldMappings(
      workflowId,
      dto.fieldMappings,
    );

    return {
      message: 'Field mappings upserted successfully',
    };
  }
}
