import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GenericDbConnectorService } from './generic-db-connector.service';
import { GenericDbConnectorController } from './generic-db-connector.controller';

@Module({
  imports: [ConfigModule],
  controllers: [GenericDbConnectorController],
  providers: [GenericDbConnectorService],
})
export class GenericDbConnectorModule {}
