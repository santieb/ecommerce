import { MigrationInterface, QueryRunner } from "typeorm";

export class dev1672524810761 implements MigrationInterface {
    name = 'dev1672524810761'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "role" TO "is_admin"`);
        await queryRunner.query(`ALTER TYPE "public"."users_role_enum" RENAME TO "users_is_admin_enum"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "is_admin"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "is_admin" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "is_admin"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "is_admin" "public"."users_is_admin_enum" NOT NULL`);
        await queryRunner.query(`ALTER TYPE "public"."users_is_admin_enum" RENAME TO "users_role_enum"`);
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "is_admin" TO "role"`);
    }

}
