import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Category1693521102940 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<any> {
        const table = new Table({
            name: 'category',
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
                    isPrimary: false,
                    isNullable: false,
                },
            ],
        });
        await queryRunner.createTable(table);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('category');
    }
}
