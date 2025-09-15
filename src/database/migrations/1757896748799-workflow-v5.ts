import { MigrationInterface, QueryRunner } from 'typeorm';

export class WorkflowV51757896748799 implements MigrationInterface {
  name = 'WorkflowV51757896748799';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user_workflow_assignments" ("user_id" uuid NOT NULL, "workflow_id" uuid NOT NULL, CONSTRAINT "PK_bfef43b9027784c1ebcfe564fa6" PRIMARY KEY ("user_id", "workflow_id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_51936723a4af77bf547f9b1509" ON "user_workflow_assignments" ("user_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_e464ab5b378deb088ab118f103" ON "user_workflow_assignments" ("workflow_id") `,
    );
    await queryRunner.query(
      `ALTER TABLE "workflow_fields" ADD "options" text array`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_workflow_assignments" ADD CONSTRAINT "FK_51936723a4af77bf547f9b15095" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_workflow_assignments" ADD CONSTRAINT "FK_e464ab5b378deb088ab118f103a" FOREIGN KEY ("workflow_id") REFERENCES "workflows"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_workflow_assignments" DROP CONSTRAINT "FK_e464ab5b378deb088ab118f103a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_workflow_assignments" DROP CONSTRAINT "FK_51936723a4af77bf547f9b15095"`,
    );
    await queryRunner.query(
      `ALTER TABLE "workflow_fields" DROP COLUMN "options"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_e464ab5b378deb088ab118f103"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_51936723a4af77bf547f9b1509"`,
    );
    await queryRunner.query(`DROP TABLE "user_workflow_assignments"`);
  }
}
