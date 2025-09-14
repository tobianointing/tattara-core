import { MigrationInterface, QueryRunner } from 'typeorm';

export class WorkflowUpdate1757764737195 implements MigrationInterface {
  name = 'WorkflowUpdate1757764737195';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "workflows" ALTER COLUMN "status" SET DEFAULT 'active'`,
    );
    await queryRunner.query(
      `ALTER TABLE "workflow_fields" ALTER COLUMN "is_required" SET DEFAULT false`,
    );
    await queryRunner.query(
      `ALTER TABLE "workflow_fields" ALTER COLUMN "ai_mapping" DROP NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "workflow_fields" ALTER COLUMN "ai_mapping" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "workflow_fields" ALTER COLUMN "is_required" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "workflows" ALTER COLUMN "status" SET DEFAULT 'inactive'`,
    );
  }
}
