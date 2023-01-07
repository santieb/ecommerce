import { MigrationInterface, QueryRunner } from "typeorm";

export class dev1673055085397 implements MigrationInterface {
    name = 'dev1673055085397'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order_details" ALTER COLUMN "note" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order_details" ALTER COLUMN "note" SET NOT NULL`);
    }

}
