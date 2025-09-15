import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { Dhis2ConnectorService } from './dhis2-connector.service';
import { Dhis2ConnectorController } from './dhis2-connector.controller';

@Module({
  imports: [HttpModule, ConfigModule],
  controllers: [Dhis2ConnectorController],
  providers: [Dhis2ConnectorService],
})
export class Dhis2ConnectorModule {}
