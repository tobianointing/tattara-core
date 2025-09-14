import { MigrationInterface, QueryRunner } from 'typeorm';

export class WorkflowCascadeFixV21757785655620 implements MigrationInterface {
  name = 'WorkflowCascadeFixV21757785655620';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "field_mappings" DROP CONSTRAINT "FK_031818b261ae90772335c63c883"`,
    );
    await queryRunner.query(
      `ALTER TABLE "field_mappings" DROP CONSTRAINT "FK_d8748bb115975316f69c7ed288b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "workflow_fields" DROP CONSTRAINT "FK_7cca08a12864d7e81e7443f0877"`,
    );
    await queryRunner.query(
      `ALTER TABLE "workflows" DROP CONSTRAINT "FK_2d772a49df9b7e108fbbbdb68da"`,
    );
    await queryRunner.query(
      `ALTER TABLE "field_mappings" ADD CONSTRAINT "FK_031818b261ae90772335c63c883" FOREIGN KEY ("workflow_id") REFERENCES "workflows"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "field_mappings" ADD CONSTRAINT "FK_d8748bb115975316f69c7ed288b" FOREIGN KEY ("workflow_field_id") REFERENCES "workflow_fields"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "workflow_fields" ADD CONSTRAINT "FK_7cca08a12864d7e81e7443f0877" FOREIGN KEY ("workflow_id") REFERENCES "workflows"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "workflows" ADD CONSTRAINT "FK_2d772a49df9b7e108fbbbdb68da" FOREIGN KEY ("program_id") REFERENCES "programs"("id") ON DELETE SET NULL ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "workflows" DROP CONSTRAINT "FK_2d772a49df9b7e108fbbbdb68da"`,
    );
    await queryRunner.query(
      `ALTER TABLE "workflow_fields" DROP CONSTRAINT "FK_7cca08a12864d7e81e7443f0877"`,
    );
    await queryRunner.query(
      `ALTER TABLE "field_mappings" DROP CONSTRAINT "FK_d8748bb115975316f69c7ed288b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "field_mappings" DROP CONSTRAINT "FK_031818b261ae90772335c63c883"`,
    );
    await queryRunner.query(
      `ALTER TABLE "workflows" ADD CONSTRAINT "FK_2d772a49df9b7e108fbbbdb68da" FOREIGN KEY ("program_id") REFERENCES "programs"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "workflow_fields" ADD CONSTRAINT "FK_7cca08a12864d7e81e7443f0877" FOREIGN KEY ("workflow_id") REFERENCES "workflows"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "field_mappings" ADD CONSTRAINT "FK_d8748bb115975316f69c7ed288b" FOREIGN KEY ("workflow_field_id") REFERENCES "workflow_fields"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "field_mappings" ADD CONSTRAINT "FK_031818b261ae90772335c63c883" FOREIGN KEY ("workflow_id") REFERENCES "workflows"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }
}
