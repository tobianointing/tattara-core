import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';

@Injectable()
export class GenericDbConnectorService {
  private dataSource: DataSource;

  constructor(private readonly configService: ConfigService) {}

  async connect() {
    this.dataSource = new DataSource({
      type:
        this.configService.get<'postgres' | 'mysql' | 'sqlite'>(
          'generic_db.type',
        ) ?? 'postgres',
      host: this.configService.get<string>('generic_db.host') ?? 'localhost',
      port: this.configService.get<number>('generic_db.port') ?? 5432,
      username: this.configService.get<string>('generic_db.username') ?? '',
      password: this.configService.get<string>('generic_db.password') ?? '',
      database: this.configService.get<string>('generic_db.database') ?? '',
      entities: [],
      synchronize: false,
    });

    await this.dataSource.initialize();
    return this.dataSource;
  }

  async query(sql: string, params?: any[]): Promise<any> {
    return this.dataSource.query(sql, params);
  }
}
