import { Test, TestingModule } from '@nestjs/testing';
import { GenericDbConnectorService } from './generic-db-connector.service';

describe('GenericDbConnectorService', () => {
  let service: GenericDbConnectorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GenericDbConnectorService],
    }).compile();

    service = module.get<GenericDbConnectorService>(GenericDbConnectorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
