import {MigrationInterface, QueryRunner} from "typeorm";

export class SyncAssets1778112303223 implements MigrationInterface {
    name = 'SyncAssets1778112303223'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Створюємо нові таблиці
        await queryRunner.query(`
            CREATE TABLE "company" (
                "company_id" SERIAL NOT NULL,
                "name" character varying NOT NULL,
                "industry" character varying NOT NULL,
                "website" character varying,
                CONSTRAINT "PK_b7f9888ba8bd654c4860ddfcb3a" PRIMARY KEY ("company_id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "bond" (
                "bond_id" SERIAL NOT NULL,
                "industry" character varying NOT NULL,
                "investment_term" character varying NOT NULL,
                "annual_profit_percent" numeric(5, 2) NOT NULL,
                "company_id" integer,
                CONSTRAINT "PK_7912bd2fd1a01b51e0b1c7b4c0a" PRIMARY KEY ("bond_id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "action" (
                "action_id" SERIAL NOT NULL,
                "name" character varying NOT NULL,
                "industry" character varying NOT NULL,
                "price" numeric(10, 4) NOT NULL,
                "company_id" integer,
                CONSTRAINT "PK_5faf700dad0c8b77097ebefa533" PRIMARY KEY ("action_id")
            )
        `);

        // Додаємо зв'язки (Foreign Keys)
        await queryRunner.query(`
            ALTER TABLE "bond"
            ADD CONSTRAINT "FK_678d6e3aa5c5de4ddc4852e496f" FOREIGN KEY ("company_id") REFERENCES "company"("company_id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "action"
            ADD CONSTRAINT "FK_0a822585765a971ceb97ac8474f" FOREIGN KEY ("company_id") REFERENCES "company"("company_id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "action" DROP CONSTRAINT "FK_0a822585765a971ceb97ac8474f"`);
        await queryRunner.query(`ALTER TABLE "bond" DROP CONSTRAINT "FK_678d6e3aa5c5de4ddc4852e496f"`);
        await queryRunner.query(`DROP TABLE "action"`);
        await queryRunner.query(`DROP TABLE "company"`);
        await queryRunner.query(`DROP TABLE "bond"`);
    }
}