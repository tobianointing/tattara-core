import { Test, TestingModule } from '@nestjs/testing';
import { Dhis2ConnectorController } from './dhis2-connector.controller';
import { Dhis2ConnectorService } from './dhis2-connector.service';

describe('Dhis2ConnectorController', () => {
  let controller: Dhis2ConnectorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [Dhis2ConnectorController],
      providers: [Dhis2ConnectorService],
    }).compile();

    controller = module.get<Dhis2ConnectorController>(Dhis2ConnectorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
