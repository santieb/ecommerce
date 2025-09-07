import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1757263955424 implements MigrationInterface {
    name = 'Init1757263955424'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" ADD "status" character varying(32) NOT NULL DEFAULT 'pending_payment'`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "preference_id" character varying`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "payment_id" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "payment_id"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "preference_id"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "status"`);
    }

}
