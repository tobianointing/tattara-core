import { MigrationInterface, QueryRunner } from 'typeorm';

export class ExtConn1758475008682 implements MigrationInterface {
  name = 'ExtConn1758475008682';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "external_connections" ADD CONSTRAINT "UQ_44b7d1294dab91b8ab08b4c3153" UNIQUE ("name")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "external_connections" DROP CONSTRAINT "UQ_44b7d1294dab91b8ab08b4c3153"`,
    );
  }
}
