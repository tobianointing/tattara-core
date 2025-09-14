import { MigrationInterface, QueryRunner } from 'typeorm';

export class FileUpload1757642442816 implements MigrationInterface {
  name = 'FileUpload1757642442816';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "files" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_id" uuid NOT NULL, "submission_id" uuid NOT NULL, "ai_processing_lod_id" uuid NOT NULL, "original_filename" character varying NOT NULL, "file_type" character varying NOT NULL, "mimetype" character varying NOT NULL, "file_size" integer NOT NULL, "key" character varying NOT NULL, "storage_path" character varying NOT NULL, "storage_provider" character varying NOT NULL, "checksum" character varying NOT NULL, "metadata" jsonb, "is_processed" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_6c16b9093a142e0e7613b04a3d9" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "files"`);
  }
}
