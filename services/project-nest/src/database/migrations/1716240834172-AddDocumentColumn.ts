import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddDocumentColumn1716239292209 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumns('user', [
            new TableColumn({
                name: 'document',
                type: 'varchar',
                length: '255',
                isPrimary: false,
                isNullable: true,
            }),
        ]);
    }

    public async down(_queryRunner: QueryRunner): Promise<void> {}
}
