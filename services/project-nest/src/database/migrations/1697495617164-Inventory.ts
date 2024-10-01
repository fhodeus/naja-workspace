import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Inventory1697495617164 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        const table = new Table({
            name: 'inventory',
            columns: [
                {
                    name: 'id',
                    type: 'varchar',
                    length: '255',
                    isPrimary: true,
                },
                {
                    name: 'name',
                    type: 'varchar',
                    length: '255',
                    isNullable: true,
                },
                {
                    name: 'lote',
                    type: 'varchar',
                    length: '255',
                    isNullable: true,
                },
                {
                    name: 'manufacturin_data',
                    type: 'varchar',
                    length: '255',
                    isNullable: true,
                },
                {
                    name: 'expiration_date',
                    type: 'varchar',
                    length: '255',
                    isNullable: true,
                },
                {
                    name: 'quantity',
                    type: 'int',
                    isNullable: true,
                },
                {
                    name: 'supplier',
                    type: 'varchar',
                    length: '255',
                    isNullable: true,
                },
                {
                    name: 'purchase_price',
                    type: 'int',
                    isNullable: true,
                },
                {
                    name: 'sale_price',
                    type: 'int',
                    isNullable: true,
                },
                {
                    name: 'storage_location',
                    type: 'varchar',
                    length: '255',
                    isNullable: true,
                },
                {
                    name: 'reorder_point',
                    type: 'int',
                    default: 1,
                    isNullable: true,
                },
                {
                    name: 'usage_and_administration_notes',
                    type: 'varchar',
                    length: '255',
                    isNullable: true,
                },
                {
                    name: 'substance_control_record',
                    type: 'varchar',
                    length: '255',
                    isNullable: true,
                },
                {
                    name: 'safety_information',
                    type: 'varchar',
                    length: '255',
                    isNullable: true,
                },
                {
                    name: 'additional_notes',
                    type: 'varchar',
                    length: '255',
                    isNullable: true,
                },
            ],
        });
        await queryRunner.createTable(table);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('inventory');
    }
}
