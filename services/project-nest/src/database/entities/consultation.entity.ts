import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Veterinarian } from './veterinarian.entity';
import { Pet } from './pet.entity';
import { DoseInventory } from './dose-inventory.entity';
import { BaseEntity } from 'src/module/_shared/base/base.entity';

@Entity({ name: 'consultation' })
export class Consultation extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @Column()
    public day: string;

    @Column({ name: 'start_time' })
    public startTime: string;

    @Column({ name: 'end_time' })
    public endTime: string;

    @Column({ name: 'status', default: '' })
    public status: string;

    @Column({ name: 'reason', default: '' })
    public reason: string;

    @Column({ name: 'scheduleType', default: '' })
    public scheduleType: string;

    @Column({ name: 'pet_id', nullable: false })
    public petId: string;

    @ManyToOne(() => Pet, (pet) => pet.consultations)
    @JoinColumn({ name: 'pet_id' })
    public pet: Pet;

    @Column({ name: 'veterinarian_id', nullable: false })
    public veterinarianId: string;

    @Column({ name: 'notification_responsible' })
    public notificationResponsible: boolean;

    @Column({ name: 'notification_veterinarian' })
    public notificationVetetinarian: boolean;

    @ManyToOne(() => Veterinarian, (veterinarian) => veterinarian.consultations)
    @JoinColumn({ name: 'veterinarian_id' })
    public veterinarian: Veterinarian;

    @OneToMany(() => DoseInventory, (doseInventory) => doseInventory.consultation)
    public doseInventory: DoseInventory[];

    @Column({ name: 'anamnese_principal', default: '' })
    public anamnesePrincipal: string;

    @Column({ name: 'anamnese_progress', default: '' })
    public anamneseProgress: string;

    @Column({ name: 'anamnese_food', default: '' })
    public anamneseFood: string;

    @Column({ name: 'anamnese_contactants', default: '' })
    public anamneseContactants: string;

    @Column({ name: 'anamnese_special', default: '' })
    public anamneseSpecial: string;
}
