import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Service } from 'typedi';

import { Inventory } from './inventory.model';
import { Consultation } from './consultation.model';

@Entity()
@Service()
export class DoseInventory {
    @PrimaryGeneratedColumn('uuid')
    public id: string;

    public name: string;

    @Column()
    public lote: string;

    @Column({ name: 'consultation_id', nullable: true })
    public consultationId: string;

    @ManyToOne((type) => Consultation, (consultation) => consultation.doseInventory)
    @JoinColumn({ name: 'consultation_id' })
    public consultation: Consultation;

    @Column({ name: 'inventory_id', nullable: false })
    public inventoryId: string;

    @ManyToOne((type) => Inventory, (inventory) => inventory.doseInventory)
    @JoinColumn({ name: 'inventory_id' })
    public inventory: Inventory;
}
