import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddColumnReason1710892900220 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        const columnReason = new TableColumn({
            name: 'reason',
            type: 'varchar',
            length: '255',
            isPrimary: false,
            isNullable: true,
        });

        await queryRunner.addColumns('consultation', [columnReason]);
    }

    public async down(_queryRunner: QueryRunner): Promise<void> {}
}
