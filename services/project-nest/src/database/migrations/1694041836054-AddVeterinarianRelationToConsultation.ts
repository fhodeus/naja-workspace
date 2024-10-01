import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export class AddVeterinarianRelationToConsultation1694041836054 implements MigrationInterface {
    private tableForeignKey = new TableForeignKey({
        name: 'fk_veterinarian_consultation',
        columnNames: ['veterinarian_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'veterinarian',
        onDelete: 'CASCADE',
    });

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createForeignKey('consultation', this.tableForeignKey);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropForeignKey('consultation', this.tableForeignKey);
    }
}
