import { MigrationInterface, QueryRunner } from 'typeorm';

export class WorkflowConfig1757680870696 implements MigrationInterface {
  name = 'WorkflowConfig1757680870696';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."workflow_configurations_type_enum" AS ENUM('dhis2', 'postgres')`,
    );
    await queryRunner.query(
      `CREATE TABLE "workflow_configurations" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "type" "public"."workflow_configurations_type_enum" NOT NULL DEFAULT 'dhis2', "configuration" jsonb NOT NULL, "is_active" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "workflow_id" uuid, CONSTRAINT "PK_be15def602b29e81e73dd85a721" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "workflow_configurations" ADD CONSTRAINT "FK_8625c9ad071151e72f3b3066d17" FOREIGN KEY ("workflow_id") REFERENCES "workflows"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "workflow_configurations" DROP CONSTRAINT "FK_8625c9ad071151e72f3b3066d17"`,
    );
    await queryRunner.query(`DROP TABLE "workflow_configurations"`);
    await queryRunner.query(
      `DROP TYPE "public"."workflow_configurations_type_enum"`,
    );
  }
}
