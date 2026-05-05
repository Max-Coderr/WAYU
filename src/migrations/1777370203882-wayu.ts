import { MigrationInterface, QueryRunner } from 'typeorm';

export class Wayu1777370203882 implements MigrationInterface {
  name = 'Wayu1777370203882';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "news" ADD "categoryId" integer NOT NULL`);
    await queryRunner.query(`ALTER TABLE "news" ADD "title" character varying(256) NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "news" ADD CONSTRAINT "FK_12a76d9b0f635084194b2c6aa01" FOREIGN KEY ("categoryId") REFERENCES "news_categories"("id") ON DELETE RESTRICT ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "news" DROP CONSTRAINT "FK_12a76d9b0f635084194b2c6aa01"`);
    await queryRunner.query(`ALTER TABLE "news" DROP COLUMN "title"`);
    await queryRunner.query(`ALTER TABLE "news" DROP COLUMN "categoryId"`);
  }
}
