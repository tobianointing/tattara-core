import {
  Controller,
  Post,
  Body,
  Param,
  Get,
  Patch,
  Delete,
} from '@nestjs/common';
import { ExternalConnectionsService } from '../services/external-connections.service';
import { ExternalConnection } from 'src/database/entities';
import { Roles } from 'src/common/decorators';

@Controller('external-connections')
export class ExternalConnectionsController {
  constructor(private readonly service: ExternalConnectionsService) {}

  @Post()
  @Roles('admin')
  async create(@Body() data: Partial<ExternalConnection>) {
    return this.service.create(data);
  }

  @Get()
  @Roles('admin')
  async findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @Roles('admin')
  async findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  @Roles('admin')
  async update(
    @Param('id') id: string,
    @Body() data: Partial<ExternalConnection>,
  ) {
    return this.service.update(id, data);
  }

  @Delete(':id')
  @Roles('admin')
  async remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
