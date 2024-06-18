import { MigrationInterface, QueryRunner, TableColumn } from "typeorm"

export class AddColumnTypeConsultation1710894868738 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const columnScheduleType = new TableColumn({
            name: 'scheduleType',
            type: 'varchar',
            length: '255',
            isPrimary: false,
            isNullable: true,
           
        });
        
        await queryRunner.addColumns('consultation', [columnScheduleType]);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
