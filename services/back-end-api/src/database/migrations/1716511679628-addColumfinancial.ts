import { MigrationInterface, QueryRunner, TableColumn } from "typeorm"

export class AddColumfinancial1716511679628 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumns('financial', [
            new TableColumn({
                name: 'month',
                type: 'varchar',
                length: '255',
                isPrimary: false,
                isNullable: true,
            }),
        ]);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }
}
