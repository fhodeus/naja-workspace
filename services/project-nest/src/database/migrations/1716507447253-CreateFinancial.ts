import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateFinancial1716507447253 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<any> {
        const table = new Table({
            name: 'financial',
            columns: [
                {
                    name: 'id',
                    type: 'varchar',
                    length: '255',
                    isPrimary: true,
                },
                {
                    name: 'start_time',
                    type: 'timestamp',
                    isNullable: false,
                },
                {
                    name: 'end_time',
                    type: 'timestamp',
                    isNullable: false,
                },
            ],
        });
        await queryRunner.createTable(table);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropTable('financial');
    }
}
