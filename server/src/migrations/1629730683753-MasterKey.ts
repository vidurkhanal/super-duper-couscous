import {MigrationInterface, QueryRunner} from "typeorm";

export class MasterKey1629730683753 implements MigrationInterface {
    name = 'MasterKey1629730683753'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."user" ALTER COLUMN "masterPIN" SET NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."user" ALTER COLUMN "masterPIN" DROP NOT NULL`);
    }

}
