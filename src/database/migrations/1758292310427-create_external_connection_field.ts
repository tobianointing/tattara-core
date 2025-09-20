import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateExternalConnectionField1758292310427
  implements MigrationInterface
{
  name = 'CreateExternalConnectionField1758292310427';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."external_connections_type_enum" AS ENUM('dhis2', 'generic_db')`,
    );
    await queryRunner.query(
      `CREATE TABLE "external_connections" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(255) NOT NULL, "type" "public"."external_connections_type_enum" NOT NULL, "configuration" jsonb NOT NULL, "is_active" boolean NOT NULL DEFAULT true, "last_tested_at" TIMESTAMP, "test_result" jsonb, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "created_by" uuid, CONSTRAINT "PK_bd94546e05c28648ee2bad611f3" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "external_connections" ADD CONSTRAINT "FK_bc0cd053757112756d981cfc132" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "external_connections" DROP CONSTRAINT "FK_bc0cd053757112756d981cfc132"`,
    );
    await queryRunner.query(`DROP TABLE "external_connections"`);
    await queryRunner.query(
      `DROP TYPE "public"."external_connections_type_enum"`,
    );
  }
}
