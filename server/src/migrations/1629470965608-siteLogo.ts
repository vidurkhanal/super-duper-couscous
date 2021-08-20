import {MigrationInterface, QueryRunner} from "typeorm";

export class siteLogo1629470965608 implements MigrationInterface {
    name = 'siteLogo1629470965608'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "credential" ADD "siteLogo" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "credential" DROP COLUMN "siteLogo"`);
    }

}
