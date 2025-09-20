import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { IntegrationService } from '../services/integration.service';
import type { ConnectionDto, PushDataDto } from '../dto/connection.dto';
import type { Dhis2Config } from '../interfaces/connection-config.interface';

@Controller('integration')
export class IntegrationController {
  constructor(private readonly integrationService: IntegrationService) {}

  @Post('test-connection')
  async testConnection(@Body() connection: ConnectionDto): Promise<any> {
    return this.integrationService.testConnection(connection);
  }

  @Post('schemas')
  async fetchSchemas(@Body() connection: ConnectionDto): Promise<any> {
    return this.integrationService.fetchSchemas(connection);
  }

  @Post('push')
  async pushData(@Body() body: PushDataDto): Promise<any> {
    return this.integrationService.pushData(body.connection, body.payload);
  }

  // DHIS2 specific endpoints
  @Post('dhis2/programs')
  async getPrograms(@Body() connection: ConnectionDto): Promise<any> {
    if (connection.type !== 'dhis2' || !('baseUrl' in connection.config)) {
      throw new BadRequestException('Invalid DHIS2 connection configuration');
    }
    // Now safe to cast
    return this.integrationService.getPrograms({
      type: connection.type,
      config: connection.config as Dhis2Config,
    });
  }
}
