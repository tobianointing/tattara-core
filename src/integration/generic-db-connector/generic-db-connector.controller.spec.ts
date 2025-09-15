import { Test, TestingModule } from '@nestjs/testing';
import { GenericDbConnectorController } from './generic-db-connector.controller';
import { GenericDbConnectorService } from './generic-db-connector.service';

describe('GenericDbConnectorController', () => {
  let controller: GenericDbConnectorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GenericDbConnectorController],
      providers: [GenericDbConnectorService],
    }).compile();

    controller = module.get<GenericDbConnectorController>(
      GenericDbConnectorController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
