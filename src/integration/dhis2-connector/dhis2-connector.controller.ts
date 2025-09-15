import { Controller } from '@nestjs/common';
import { Dhis2ConnectorService } from './dhis2-connector.service';

@Controller('dhis2-connector')
export class Dhis2ConnectorController {
  constructor(private readonly dhis2ConnectorService: Dhis2ConnectorService) {}
}
