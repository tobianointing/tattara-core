import { MigrationInterface, QueryRunner } from 'typeorm';

export class ConvertExistingIdsToUuid1756809068156
  implements MigrationInterface
{
  name = 'ConvertExistingIdsToUuid1756809068156';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Enable UUID extension if not already enabled
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);

    // Step 1: Create mapping tables to preserve relationships
    await queryRunner.query(`
      CREATE TABLE "temp_id_mapping_users" (
        "old_id" integer,
        "new_id" uuid DEFAULT uuid_generate_v4()
      )
    `);

    await queryRunner.query(`
      CREATE TABLE "temp_id_mapping_roles" (
        "old_id" integer,
        "new_id" uuid DEFAULT uuid_generate_v4()
      )
    `);

    await queryRunner.query(`
      CREATE TABLE "temp_id_mapping_permissions" (
        "old_id" integer,
        "new_id" uuid DEFAULT uuid_generate_v4()
      )
    `);

    // Step 2: Populate mapping tables with existing data
    await queryRunner.query(`
      INSERT INTO "temp_id_mapping_users" ("old_id")
      SELECT "id" FROM "users"
    `);

    await queryRunner.query(`
      INSERT INTO "temp_id_mapping_roles" ("old_id")
      SELECT "id" FROM "roles"
    `);

    await queryRunner.query(`
      INSERT INTO "temp_id_mapping_permissions" ("old_id")
      SELECT "id" FROM "permissions"
    `);

    // Step 3: Backup junction tables
    await queryRunner.query(`
      CREATE TABLE "temp_user_roles_backup" AS 
      SELECT * FROM "user_roles"
    `);

    await queryRunner.query(`
      CREATE TABLE "temp_role_permissions_backup" AS 
      SELECT * FROM "role_permissions"
    `);

    // Step 4: Drop all foreign key constraints
    await queryRunner.query(`
      ALTER TABLE "user_roles" DROP CONSTRAINT IF EXISTS "FK_user_roles_user_id"
    `);
    await queryRunner.query(`
      ALTER TABLE "user_roles" DROP CONSTRAINT IF EXISTS "FK_user_roles_role_id"
    `);
    await queryRunner.query(`
      ALTER TABLE "role_permissions" DROP CONSTRAINT IF EXISTS "FK_role_permissions_role_id"
    `);
    await queryRunner.query(`
      ALTER TABLE "role_permissions" DROP CONSTRAINT IF EXISTS "FK_role_permissions_permission_id"
    `);

    // Step 5: Drop junction tables
    await queryRunner.query(`DROP TABLE IF EXISTS "user_roles"`);
    await queryRunner.query(`DROP TABLE IF EXISTS "role_permissions"`);

    // Step 6: Convert Users table
    await queryRunner.query(
      `ALTER TABLE "users" ADD COLUMN "new_id" uuid DEFAULT uuid_generate_v4()`,
    );

    await queryRunner.query(`
      UPDATE "users" 
      SET "new_id" = "temp_id_mapping_users"."new_id"
      FROM "temp_id_mapping_users"
      WHERE "users"."id" = "temp_id_mapping_users"."old_id"
    `);

    await queryRunner.query(
      `ALTER TABLE "users" DROP CONSTRAINT IF EXISTS "PK_users"`,
    );
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "id"`);
    await queryRunner.query(
      `ALTER TABLE "users" RENAME COLUMN "new_id" TO "id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "PK_users" PRIMARY KEY ("id")`,
    );

    // Step 7: Convert Roles table
    await queryRunner.query(
      `ALTER TABLE "roles" ADD COLUMN "new_id" uuid DEFAULT uuid_generate_v4()`,
    );

    await queryRunner.query(`
      UPDATE "roles" 
      SET "new_id" = "temp_id_mapping_roles"."new_id"
      FROM "temp_id_mapping_roles"
      WHERE "roles"."id" = "temp_id_mapping_roles"."old_id"
    `);

    await queryRunner.query(
      `ALTER TABLE "roles" DROP CONSTRAINT IF EXISTS "PK_roles"`,
    );
    await queryRunner.query(`ALTER TABLE "roles" DROP COLUMN "id"`);
    await queryRunner.query(
      `ALTER TABLE "roles" RENAME COLUMN "new_id" TO "id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "roles" ADD CONSTRAINT "PK_roles" PRIMARY KEY ("id")`,
    );

    // Step 8: Convert Permissions table
    await queryRunner.query(
      `ALTER TABLE "permissions" ADD COLUMN "new_id" uuid DEFAULT uuid_generate_v4()`,
    );

    await queryRunner.query(`
      UPDATE "permissions" 
      SET "new_id" = "temp_id_mapping_permissions"."new_id"
      FROM "temp_id_mapping_permissions"
      WHERE "permissions"."id" = "temp_id_mapping_permissions"."old_id"
    `);

    await queryRunner.query(
      `ALTER TABLE "permissions" DROP CONSTRAINT IF EXISTS "PK_permissions"`,
    );
    await queryRunner.query(`ALTER TABLE "permissions" DROP COLUMN "id"`);
    await queryRunner.query(
      `ALTER TABLE "permissions" RENAME COLUMN "new_id" TO "id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "permissions" ADD CONSTRAINT "PK_permissions" PRIMARY KEY ("id")`,
    );

    // Step 9: Recreate junction tables with UUIDs
    await queryRunner.query(`
      CREATE TABLE "user_roles" (
        "user_id" uuid NOT NULL,
        "role_id" uuid NOT NULL,
        CONSTRAINT "PK_user_roles" PRIMARY KEY ("user_id", "role_id")
      )
    `);

    await queryRunner.query(`
      CREATE TABLE "role_permissions" (
        "role_id" uuid NOT NULL,
        "permission_id" uuid NOT NULL,
        CONSTRAINT "PK_role_permissions" PRIMARY KEY ("role_id", "permission_id")
      )
    `);

    // Step 10: Restore many-to-many relationships using mapping tables
    await queryRunner.query(`
      INSERT INTO "user_roles" ("user_id", "role_id")
      SELECT 
        um_user."new_id",
        um_role."new_id"
      FROM "temp_user_roles_backup" urb
      JOIN "temp_id_mapping_users" um_user ON urb."user_id" = um_user."old_id"
      JOIN "temp_id_mapping_roles" um_role ON urb."role_id" = um_role."old_id"
    `);

    await queryRunner.query(`
      INSERT INTO "role_permissions" ("role_id", "permission_id")
      SELECT 
        um_role."new_id",
        um_permission."new_id"
      FROM "temp_role_permissions_backup" rpb
      JOIN "temp_id_mapping_roles" um_role ON rpb."role_id" = um_role."old_id"
      JOIN "temp_id_mapping_permissions" um_permission ON rpb."permission_id" = um_permission."old_id"
    `);

    // Step 11: Add foreign key constraints
    await queryRunner.query(`
      ALTER TABLE "user_roles" 
      ADD CONSTRAINT "FK_87b8888186ca9769c960e926870" 
      FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE
    `);

    await queryRunner.query(`
      ALTER TABLE "user_roles" 
      ADD CONSTRAINT "FK_b23c65e50a758245a33ee35fda1" 
      FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
    `);

    await queryRunner.query(`
      ALTER TABLE "role_permissions" 
      ADD CONSTRAINT "FK_178199805b901ccd220ab7740ec" 
      FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE CASCADE
    `);

    await queryRunner.query(`
      ALTER TABLE "role_permissions" 
      ADD CONSTRAINT "FK_17022daf3f885f7d35423e9971e" 
      FOREIGN KEY ("permission_id") REFERENCES "permissions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
    `);

    // Step 12: Create indexes for better performance
    await queryRunner.query(
      `CREATE INDEX "IDX_87b8888186ca9769c960e92687" ON "user_roles" ("user_id")`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_b23c65e50a758245a33ee35fda" ON "user_roles" ("role_id")`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_178199805b901ccd220ab7740e" ON "role_permissions" ("role_id")`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_17022daf3f885f7d35423e9971" ON "role_permissions" ("permission_id")`,
    );

    // Step 13: Clean up temporary tables
    await queryRunner.query(`DROP TABLE "temp_id_mapping_users"`);
    await queryRunner.query(`DROP TABLE "temp_id_mapping_roles"`);
    await queryRunner.query(`DROP TABLE "temp_id_mapping_permissions"`);
    await queryRunner.query(`DROP TABLE "temp_user_roles_backup"`);
    await queryRunner.query(`DROP TABLE "temp_role_permissions_backup"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // This rollback is destructive and will lose UUID mappings
    console.warn(
      'WARNING: Rolling back UUID migration will regenerate auto-increment IDs',
    );

    // Drop foreign key constraints
    await queryRunner.query(
      `ALTER TABLE "role_permissions" DROP CONSTRAINT "FK_17022daf3f885f7d35423e9971e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "role_permissions" DROP CONSTRAINT "FK_178199805b901ccd220ab7740ec"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_roles" DROP CONSTRAINT "FK_b23c65e50a758245a33ee35fda1"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_roles" DROP CONSTRAINT "FK_87b8888186ca9769c960e926870"`,
    );

    // Drop indexes
    await queryRunner.query(
      `DROP INDEX "public"."IDX_17022daf3f885f7d35423e9971"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_178199805b901ccd220ab7740e"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_b23c65e50a758245a33ee35fda"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_87b8888186ca9769c960e92687"`,
    );

    // Drop junction tables
    await queryRunner.query(`DROP TABLE "role_permissions"`);
    await queryRunner.query(`DROP TABLE "user_roles"`);

    // Convert back to SERIAL integers (data relationships will be lost)
    await queryRunner.query(
      `ALTER TABLE "permissions" DROP CONSTRAINT "PK_permissions"`,
    );
    await queryRunner.query(
      `ALTER TABLE "permissions" ADD COLUMN "new_id" SERIAL`,
    );
    await queryRunner.query(`ALTER TABLE "permissions" DROP COLUMN "id"`);
    await queryRunner.query(
      `ALTER TABLE "permissions" RENAME COLUMN "new_id" TO "id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "permissions" ADD CONSTRAINT "PK_permissions" PRIMARY KEY ("id")`,
    );

    await queryRunner.query(`ALTER TABLE "roles" DROP CONSTRAINT "PK_roles"`);
    await queryRunner.query(`ALTER TABLE "roles" ADD COLUMN "new_id" SERIAL`);
    await queryRunner.query(`ALTER TABLE "roles" DROP COLUMN "id"`);
    await queryRunner.query(
      `ALTER TABLE "roles" RENAME COLUMN "new_id" TO "id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "roles" ADD CONSTRAINT "PK_roles" PRIMARY KEY ("id")`,
    );

    await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "PK_users"`);
    await queryRunner.query(`ALTER TABLE "users" ADD COLUMN "new_id" SERIAL`);
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "id"`);
    await queryRunner.query(
      `ALTER TABLE "users" RENAME COLUMN "new_id" TO "id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "PK_users" PRIMARY KEY ("id")`,
    );

    // Note: Junction tables and relationships would need to be manually recreated
    console.warn(
      'Junction tables and many-to-many relationships have been dropped and need manual recreation',
    );
  }
}
