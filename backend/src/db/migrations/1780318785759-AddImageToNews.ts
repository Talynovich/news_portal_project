import { MigrationInterface, QueryRunner } from "typeorm";

export class AddImageToNews1780318785759 implements MigrationInterface {
    name = 'AddImageToNews1780318785759'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "news" ADD "imageId" integer`);
        await queryRunner.query(`ALTER TABLE "news" ADD CONSTRAINT "UQ_b1e5a455558381ffcf46be9eeee" UNIQUE ("imageId")`);
        await queryRunner.query(`ALTER TABLE "news" ADD CONSTRAINT "FK_b1e5a455558381ffcf46be9eeee" FOREIGN KEY ("imageId") REFERENCES "images"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "news" DROP CONSTRAINT "FK_b1e5a455558381ffcf46be9eeee"`);
        await queryRunner.query(`ALTER TABLE "news" DROP CONSTRAINT "UQ_b1e5a455558381ffcf46be9eeee"`);
        await queryRunner.query(`ALTER TABLE "news" DROP COLUMN "imageId"`);
    }

}
