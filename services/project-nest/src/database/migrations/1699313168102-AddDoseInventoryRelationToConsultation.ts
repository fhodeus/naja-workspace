import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export class AddDoseInventoryRelationToConsultation1699313168102 implements MigrationInterface {
    private tableForeignKey = new TableForeignKey({
        name: 'fk_inventory_consultation',
        columnNames: ['consultation_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'consultation',
        onDelete: 'CASCADE',
    });

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createForeignKey('dose_inventory', this.tableForeignKey);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropForeignKey('dose_inventory', this.tableForeignKey);
    }
}
