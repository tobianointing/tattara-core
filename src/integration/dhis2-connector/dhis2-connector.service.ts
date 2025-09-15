import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { Dhis2ProgramResponse } from './dto/program.dto';

@Injectable()
export class Dhis2ConnectorService {
  private readonly baseUrl: string;
  private readonly auth: { username: string; password: string };

  constructor(
    private readonly http: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.baseUrl = this.configService.get<string>('dhis2.baseUrl') ?? '';
    this.auth = {
      username: this.configService.get<string>('dhis2.username') ?? '',
      password: this.configService.get<string>('dhis2.password') ?? '',
    };
  }

  async getProgram(): Promise<Dhis2ProgramResponse> {
    const { data } = await this.http.axiosRef.get<Dhis2ProgramResponse>(
      `${this.baseUrl}/programs.json`,
      { auth: this.auth },
    );
    return data;
  }

  async pushData(payload: any): Promise<Dhis2ProgramResponse> {
    const { data } = await this.http.axiosRef.post<Dhis2ProgramResponse>(
      `${this.baseUrl}/dataValueSets`,
      payload,
      { auth: this.auth },
    );
    return data;
  }
}
