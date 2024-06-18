import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export class AddPetRelationToConsultation1694041725418 implements MigrationInterface {
    private tableForeignKey = new TableForeignKey({
        name: 'fk_pet_consultation',
        columnNames: ['pet_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'pet',
        onDelete: 'CASCADE',
    });

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createForeignKey('consultation', this.tableForeignKey);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropForeignKey('consultation', this.tableForeignKey);
    }
}
