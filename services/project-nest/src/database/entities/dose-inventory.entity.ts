import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Inventory } from './inventory.entity';
import { Consultation } from './consultation.entity';
import { BaseEntity } from 'src/module/_shared/base/base.entity';

@Entity({ name: 'dose_inventory' })
export class DoseInventory extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    public id: string;

    public name: string;

    @Column()
    public lote: string;

    @Column({ name: 'consultation_id', nullable: true })
    public consultationId: string;

    @ManyToOne(() => Consultation, (consultation) => consultation.doseInventory)
    @JoinColumn({ name: 'consultation_id' })
    public consultation: Consultation;

    @Column({ name: 'inventory_id', nullable: false })
    public inventoryId: string;

    @ManyToOne(() => Inventory, (inventory) => inventory.doseInventory)
    @JoinColumn({ name: 'inventory_id' })
    public inventory: Inventory;
}
