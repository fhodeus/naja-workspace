import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { DoseInventory } from './dose-inventory.entity';
import { BaseEntity } from 'src/module/_shared/base/base.entity';

@Entity({ name: 'inventory' })
export class Inventory extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @Column()
    public name: string;

    @Column()
    public lote: string;

    @Column({ name: 'manufacturin_data' })
    public manufacturinData: string;

    @Column({ name: 'expiration_date' })
    public expirationDate: string;

    @Column()
    public quantity: number;

    @Column()
    public supplier: string;

    @Column({ name: 'purchase_price' })
    public purchasePrice: string;

    @Column({ name: 'sale_price' })
    public salePrice: string;

    @Column({ name: 'storage_location' })
    public storageLocation: string;

    @Column({ name: 'reorder_point' })
    public reorderPoint: number;

    @Column({ name: 'usage_and_administration_notes' })
    public usageAndAdministrationNotes: string;

    @Column({ name: 'substance_control_record' })
    public substanceControlRecord: string;

    @Column({ name: 'safety_information' })
    public safetyInformation: string;

    @Column({ name: 'additional_notes' })
    public additionalNotes: string;

    @Column({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
    public createdAt: Date;

    @OneToMany(() => DoseInventory, (doseInventory) => doseInventory.inventory)
    public doseInventory: DoseInventory[];
}
