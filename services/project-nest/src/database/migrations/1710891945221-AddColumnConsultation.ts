import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddColumnConsultation1710891945221 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        const columnStatus = new TableColumn({
            name: 'status',
            type: 'varchar',
            length: '255',
            isPrimary: false,
            isNullable: true,
        });

        await queryRunner.addColumns('consultation', [columnStatus]);
    }

    public async down(_queryRunner: QueryRunner): Promise<void> {}
}
