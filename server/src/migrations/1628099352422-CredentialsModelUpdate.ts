import {MigrationInterface, QueryRunner} from "typeorm";

export class CredentialsModelUpdate1628099352422 implements MigrationInterface {
    name = 'CredentialsModelUpdate1628099352422'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."credential" ADD "strength" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."credential" ADD "siteName" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."credential" DROP COLUMN "siteName"`);
        await queryRunner.query(`ALTER TABLE "public"."credential" DROP COLUMN "strength"`);
    }

}
