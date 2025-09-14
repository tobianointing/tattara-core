import { MigrationInterface, QueryRunner } from 'typeorm';

export class WorkflowUniqueConstraintV31757859453232
  implements MigrationInterface
{
  name = 'WorkflowUniqueConstraintV31757859453232';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "field_mappings" DROP CONSTRAINT "UQ_5991759dffa2de8bd39f8691c1c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "field_mappings" ADD CONSTRAINT "UQ_5e904bfe200aa4abb536ba76fff" UNIQUE ("workflow_id", "workflow_field_id", "target_type")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "field_mappings" DROP CONSTRAINT "UQ_5e904bfe200aa4abb536ba76fff"`,
    );
    await queryRunner.query(
      `ALTER TABLE "field_mappings" ADD CONSTRAINT "UQ_5991759dffa2de8bd39f8691c1c" UNIQUE ("workflow_field_id", "target_type")`,
    );
  }
}
