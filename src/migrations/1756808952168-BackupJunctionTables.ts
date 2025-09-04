import { MigrationInterface, QueryRunner } from 'typeorm';

export class BackupJunctionTables1756808952169 implements MigrationInterface {
  name = 'BackupJunctionTables1756808952169';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "user_roles_backup" AS
      SELECT * FROM "user_roles"
    `);

    await queryRunner.query(`
      CREATE TABLE "role_permissions_backup" AS
      SELECT * FROM "role_permissions"
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS "user_roles_backup"`);
    await queryRunner.query(`DROP TABLE IF EXISTS "role_permissions_backup"`);
  }
}
