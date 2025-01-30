import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1738044685872 implements MigrationInterface {
    name = 'AddedDeleteAtColumn'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "googleId" character varying`);
        await queryRunner.query(`ALTER TABLE "user" ADD "deletedAt" TIMESTAMP DEFAULT ('now'::text)::timestamp(6) with time zone`);
        await queryRunner.query(`ALTER TABLE "project" ADD "deletedAt" TIMESTAMP DEFAULT ('now'::text)::timestamp(6) with time zone`);
        await queryRunner.query(`ALTER TABLE "task" ADD "deletedAt" TIMESTAMP DEFAULT ('now'::text)::timestamp(6) with time zone`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "password" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "password" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "deletedAt"`);
        await queryRunner.query(`ALTER TABLE "project" DROP COLUMN "deletedAt"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "deletedAt"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "googleId"`);
    }

}
