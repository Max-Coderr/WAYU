import { MigrationInterface, QueryRunner } from 'typeorm';

export class Wayu1777541945090 implements MigrationInterface {
  name = 'Wayu1777541945090';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "news" ADD "image" character varying(256) NOT NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "news" DROP COLUMN "image"`);
  }
}
