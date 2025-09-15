import { Test, TestingModule } from '@nestjs/testing';
import { Dhis2ConnectorService } from './dhis2-connector.service';

describe('Dhis2ConnectorService', () => {
  let service: Dhis2ConnectorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Dhis2ConnectorService],
    }).compile();

    service = module.get<Dhis2ConnectorService>(Dhis2ConnectorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
