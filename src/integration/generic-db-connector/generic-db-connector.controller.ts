import { Controller } from '@nestjs/common';
import { GenericDbConnectorService } from './generic-db-connector.service';

@Controller('generic-db-connector')
export class GenericDbConnectorController {
  constructor(
    private readonly genericDbConnectorService: GenericDbConnectorService,
  ) {}
}
