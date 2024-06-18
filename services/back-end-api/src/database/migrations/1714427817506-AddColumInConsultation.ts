import { MigrationInterface, QueryRunner, TableColumn } from "typeorm"

export class AddColumInConsultation1714427817506 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumns('consultation', [
            new TableColumn({
                name: 'anamnese_principal',
                type: 'varchar',
                length: '255',
                isPrimary: false,
                isNullable: true,
            
            }),
            new TableColumn({
                name: 'anamnese_progress',
                type: 'varchar',
                length: '255',
                isPrimary: false,
                isNullable: true
            }),
            new TableColumn({
                name: 'anamnese_food',
                type: 'varchar',
                length: '255',
                isPrimary: false,
                isNullable: true
            }),
            new TableColumn({
                name: 'anamnese_contactants',
                type: 'varchar',
                length: '255',
                isPrimary: false,
                isNullable: true
            }),
            new TableColumn({
                name: 'anamnese_special',
                type: 'varchar',
                length: '255',
                isPrimary: false,
                isNullable: true
            }),
        ]);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
