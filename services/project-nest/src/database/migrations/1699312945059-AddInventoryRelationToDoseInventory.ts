import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export class AddInventoryRelationToDoseInventory1699312945059 implements MigrationInterface {
    private tableForeignKey = new TableForeignKey({
        name: 'fk_inventory_dose_intentory',
        columnNames: ['inventory_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'inventory',
        onDelete: 'CASCADE',
    });

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createForeignKey('dose_inventory', this.tableForeignKey);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropForeignKey('dose_inventory', this.tableForeignKey);
    }
}
