import { MigrationInterface, QueryRunner, TableColumn } from "typeorm"

export class AddCreateAtInventory1716593829237 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumns('inventory', [
            new TableColumn({
                name: "created_at",
                type: "timestamp",
                default: "now()",
                isPrimary: false,
                isNullable: true,
            }),
        ]);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
