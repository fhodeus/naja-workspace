import { MigrationInterface, QueryRunner, TableColumn } from "typeorm"

export class CretateStatusFinancial1716740053036 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumns('financial', [
            new TableColumn({
                name: 'status',
                type: 'varchar',
                length: '255',
                isPrimary: false,
                isNullable: true
            }),
        ]);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
