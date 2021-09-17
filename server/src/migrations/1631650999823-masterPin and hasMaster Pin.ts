import {MigrationInterface, QueryRunner} from "typeorm";

export class masterPinAndHasMasterPin1631650999823 implements MigrationInterface {
    name = 'masterPinAndHasMasterPin1631650999823'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."user" ADD "hasMasterPIN" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "public"."user" ALTER COLUMN "masterPIN" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."user" ALTER COLUMN "masterPIN" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."user" DROP COLUMN "hasMasterPIN"`);
    }

}
