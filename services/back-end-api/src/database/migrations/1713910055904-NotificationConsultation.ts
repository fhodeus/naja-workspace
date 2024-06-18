import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class NotificationConsultation1713910055904 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumns('consultation', [
            new TableColumn({
                name: 'notification_responsible',
                type: 'boolean',
                default: false,
            }),
            new TableColumn({
                name: 'notification_veterinarian',
                type: 'boolean',
                default: false,
            }),
        ]);
    }

    public async down(_queryRunner: QueryRunner): Promise<void> {}
}
