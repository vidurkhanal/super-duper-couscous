import {MigrationInterface, QueryRunner} from "typeorm";

export class LoginAttemptAndFrozen1630676303557 implements MigrationInterface {
    name = 'LoginAttemptAndFrozen1630676303557'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."user" ADD "loginAttemts" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "public"."user" ADD "isFrozen" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."user" DROP COLUMN "isFrozen"`);
        await queryRunner.query(`ALTER TABLE "public"."user" DROP COLUMN "loginAttemts"`);
    }

}
