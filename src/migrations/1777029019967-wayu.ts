import { MigrationInterface, QueryRunner } from 'typeorm';

export class Wayu1777029019967 implements MigrationInterface {
  name = 'Wayu1777029019967';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "news" ("id" SERIAL NOT NULL, "created" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated" TIMESTAMP WITH TIME ZONE DEFAULT now(), CONSTRAINT "PK_39a43dfcb6007180f04aff2357e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "news_categories" ("id" SERIAL NOT NULL, "created" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated" TIMESTAMP WITH TIME ZONE DEFAULT now(), "title" character varying(64) NOT NULL, CONSTRAINT "UQ_3b52b497ae78df865c6769dc719" UNIQUE ("title"), CONSTRAINT "PK_20eed6c3ae534e7721fa44874a3" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "news_categories"`);
    await queryRunner.query(`DROP TABLE "news"`);
  }
}
