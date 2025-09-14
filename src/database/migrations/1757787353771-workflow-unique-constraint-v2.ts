import { MigrationInterface, QueryRunner } from 'typeorm';

export class WorkflowUniqueConstraintV21757787353771
  implements MigrationInterface
{
  name = 'WorkflowUniqueConstraintV21757787353771';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "field_mappings" ADD CONSTRAINT "UQ_5991759dffa2de8bd39f8691c1c" UNIQUE ("workflow_field_id", "target_type")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "field_mappings" DROP CONSTRAINT "UQ_5991759dffa2de8bd39f8691c1c"`,
    );
  }
}
