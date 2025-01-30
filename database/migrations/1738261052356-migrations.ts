import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1738261052356 implements MigrationInterface {
    name = 'Migrations1738261052356'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "project" ADD "createdBy" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "task" ADD "createdBy" uuid NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "createdBy"`);
        await queryRunner.query(`ALTER TABLE "project" DROP COLUMN "createdBy"`);
    }

}
