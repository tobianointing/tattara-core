import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateProgramWorkflowFieldMapping1757414454529
  implements MigrationInterface
{
  name = 'CreateProgramWorkflowFieldMapping1757414454529';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "programs" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_ba50d0f7b68ee5b73f7e7b8fdf9" UNIQUE ("name"), CONSTRAINT "PK_d43c664bcaafc0e8a06dfd34e05" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "field_mappings" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "target_type" character varying NOT NULL, "target" jsonb NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "workflow_id" uuid, "workflow_field_id" uuid, CONSTRAINT "PK_0a8b5aee97dcbb141f26bfead15" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."workflow_fields_field_type_enum" AS ENUM('text', 'number', 'date', 'datetime', 'select', 'multiselect', 'boolean', 'email', 'phone', 'url', 'textarea')`,
    );
    await queryRunner.query(
      `CREATE TABLE "workflow_fields" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "field_name" character varying NOT NULL, "label" character varying NOT NULL, "field_type" "public"."workflow_fields_field_type_enum" NOT NULL DEFAULT 'text', "is_required" boolean NOT NULL, "validation_rules" jsonb, "ai_mapping" jsonb NOT NULL, "display_order" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "workflow_id" uuid, CONSTRAINT "PK_8497e53a958c93e4b7e896a802d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."workflows_status_enum" AS ENUM('active', 'inactive', 'archived')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."workflows_enabled_modes_enum" AS ENUM('audio', 'text', 'form', 'image')`,
    );
    await queryRunner.query(
      `CREATE TABLE "workflows" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" character varying NOT NULL, "status" "public"."workflows_status_enum" NOT NULL DEFAULT 'inactive', "supported_languages" text array NOT NULL DEFAULT '{}', "enabled_modes" "public"."workflows_enabled_modes_enum" array NOT NULL DEFAULT '{text}', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "version" integer NOT NULL DEFAULT '1', "program_id" uuid, CONSTRAINT "UQ_a911fb2e0cb9ea97b6c39e0708c" UNIQUE ("name"), CONSTRAINT "PK_5b5757cc1cd86268019fef52e0c" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "first_name" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "last_name" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "field_mappings" ADD CONSTRAINT "FK_031818b261ae90772335c63c883" FOREIGN KEY ("workflow_id") REFERENCES "workflows"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "field_mappings" ADD CONSTRAINT "FK_d8748bb115975316f69c7ed288b" FOREIGN KEY ("workflow_field_id") REFERENCES "workflow_fields"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "workflow_fields" ADD CONSTRAINT "FK_7cca08a12864d7e81e7443f0877" FOREIGN KEY ("workflow_id") REFERENCES "workflows"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "workflows" ADD CONSTRAINT "FK_2d772a49df9b7e108fbbbdb68da" FOREIGN KEY ("program_id") REFERENCES "programs"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
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
      `ALTER TABLE "users" ALTER COLUMN "last_name" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "first_name" DROP NOT NULL`,
    );
    await queryRunner.query(`DROP TABLE "workflows"`);
    await queryRunner.query(
      `DROP TYPE "public"."workflows_enabled_modes_enum"`,
    );
    await queryRunner.query(`DROP TYPE "public"."workflows_status_enum"`);
    await queryRunner.query(`DROP TABLE "workflow_fields"`);
    await queryRunner.query(
      `DROP TYPE "public"."workflow_fields_field_type_enum"`,
    );
    await queryRunner.query(`DROP TABLE "field_mappings"`);
    await queryRunner.query(`DROP TABLE "programs"`);
  }
}
