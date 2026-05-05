import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddCountries1777548505150 implements MigrationInterface {
  name = 'AddCountries1777548505150';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "useful_links" ("id" SERIAL NOT NULL, "created" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated" TIMESTAMP WITH TIME ZONE DEFAULT now(), "title" character varying(128) NOT NULL, "icon" character varying(128) NOT NULL, "link" character varying(128) NOT NULL, CONSTRAINT "PK_d78a8d61586e1cc5efee1e1d7f3" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "representatives" ("id" SERIAL NOT NULL, "created" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated" TIMESTAMP WITH TIME ZONE DEFAULT now(), "fullName" character varying(64) NOT NULL, "image" character varying(128) NOT NULL, "email" character varying(64) NOT NULL, "phoneNumber" character varying(16) NOT NULL, "resume" text NOT NULL, CONSTRAINT "PK_80e9af53802d5e0376d1ae8f68c" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "countries" ("id" SERIAL NOT NULL, "created" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated" TIMESTAMP WITH TIME ZONE DEFAULT now(), "title" character varying(64) NOT NULL, "flag" character varying(128) NOT NULL, CONSTRAINT "UQ_f0ab39b0865e4939e37308fe0a7" UNIQUE ("title"), CONSTRAINT "PK_b2d7006793e8697ab3ae2deff18" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "social_links" ("id" SERIAL NOT NULL, "created" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated" TIMESTAMP WITH TIME ZONE DEFAULT now(), "title" character varying(64) NOT NULL, "icon" character varying(128) NOT NULL, "link" character varying(128) NOT NULL, CONSTRAINT "PK_50d32c67ddd71c09d372b02167f" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "social_links"`);
    await queryRunner.query(`DROP TABLE "countries"`);
    await queryRunner.query(`DROP TABLE "representatives"`);
    await queryRunner.query(`DROP TABLE "useful_links"`);
  }
}
