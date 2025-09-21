import { MigrationInterface, QueryRunner } from 'typeorm';

export class AiLog1758292598197 implements MigrationInterface {
  name = 'AiLog1758292598197';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // make confidence_score nullable
    await queryRunner.query(
      `ALTER TABLE "ai_processing_logs" ALTER COLUMN "confidence_score" DROP NOT NULL`,
    );

    // change type of processing_time_ms without dropping data
    await queryRunner.query(
      `ALTER TABLE "ai_processing_logs"
       ALTER COLUMN "processing_time_ms" TYPE numeric(5,2)
       USING "processing_time_ms"::numeric`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // revert processing_time_ms back to integer (if you really want that)
    await queryRunner.query(
      `ALTER TABLE "ai_processing_logs"
       ALTER COLUMN "processing_time_ms" TYPE integer
       USING round("processing_time_ms")::integer`,
    );

    // make confidence_score NOT NULL again
    await queryRunner.query(
      `ALTER TABLE "ai_processing_logs" ALTER COLUMN "confidence_score" SET NOT NULL`,
    );
  }
}
