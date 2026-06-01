import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateImageEntitiesTable1780318218828 implements MigrationInterface {
    name = 'CreateImageEntitiesTable1780318218828'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "images" ("id" SERIAL NOT NULL, "url" character varying NOT NULL, "s3key" character varying NOT NULL, "assigned" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_1fe148074c6a1a91b63cb9ee3c9" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "images"`);
    }

}
