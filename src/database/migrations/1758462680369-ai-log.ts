import { MigrationInterface, QueryRunner } from 'typeorm';

export class AiLog1758462680369 implements MigrationInterface {
  name = 'AiLog1758462680369';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "ai_processing_logs" ADD "metadata" jsonb`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "ai_processing_logs" DROP COLUMN "metadata"`,
    );
  }
}
