import { MigrationInterface, QueryRunner } from "typeorm";

export class INITIAL1672545377771 implements MigrationInterface {
  name = "INITIAL1672545377771";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user" ("userID" uuid NOT NULL DEFAULT uuid_generate_v4(), "createDate" TIMESTAMP NOT NULL DEFAULT now(), "updatedDate" TIMESTAMP NOT NULL DEFAULT now(), "fullName" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "masterPIN" character varying, "hasMasterPIN" boolean NOT NULL DEFAULT false, "isVerified" boolean NOT NULL DEFAULT false, "loginAttemts" integer NOT NULL DEFAULT '0', "isFrozen" boolean NOT NULL DEFAULT false, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_46d78688eda2476cb18f7eae8a5" PRIMARY KEY ("userID"))`
    );
    await queryRunner.query(
      `CREATE TABLE "credential" ("credentialID" uuid NOT NULL DEFAULT uuid_generate_v4(), "createDate" TIMESTAMP NOT NULL DEFAULT now(), "updatedDate" TIMESTAMP NOT NULL DEFAULT now(), "email" character varying NOT NULL, "password" text NOT NULL, "strength" integer NOT NULL, "siteName" character varying NOT NULL, "siteLogo" character varying, "userID" uuid, CONSTRAINT "PK_e81ca0ac2403c42c5cdca54cee8" PRIMARY KEY ("credentialID"))`
    );
    await queryRunner.query(
      `ALTER TABLE "credential" ADD CONSTRAINT "FK_de38a6e66932cb484536e2ccf3a" FOREIGN KEY ("userID") REFERENCES "user"("userID") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "credential" DROP CONSTRAINT "FK_de38a6e66932cb484536e2ccf3a"`
    );
    await queryRunner.query(`DROP TABLE "credential"`);
    await queryRunner.query(`DROP TABLE "user"`);
  }
}
