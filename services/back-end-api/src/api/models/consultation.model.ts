import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Service } from 'typedi';
import { Veterinarian } from './veterinarian.model';
import { Pet } from './pet.model';
import { DoseInventory } from './dose-inventory.model';

@Entity()
@Service()
export class Consultation {
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

    @ManyToOne((type) => Pet, (pet) => pet.consultations)
    @JoinColumn({ name: 'pet_id' })
    public pet: Pet;

    @Column({ name: 'veterinarian_id', nullable: false })
    public veterinarianId: string;

    @Column({ name: 'notification_responsible' })
    public notificationResponsible: boolean;

    @Column({ name: 'notification_veterinarian' })
    public notificationVetetinarian: boolean;

    @ManyToOne((type) => Veterinarian, (veterinarian) => veterinarian.consultations)
    @JoinColumn({ name: 'veterinarian_id' })
    public veterinarian: Veterinarian;

    @OneToMany((type) => DoseInventory, (doseInventory) => doseInventory.consultation)
    public doseInventory: DoseInventory[];

    @Column({ name: 'anamnese_principal', default:"" })
    public anamnesePrincipal: string;

    @Column({ name: 'anamnese_progress', default:"" })
    public anamneseProgress: string;

    @Column({ name: 'anamnese_food', default:"" })
    public anamneseFood: string;

    @Column({ name: 'anamnese_contactants', default:"" })
    public anamneseContactants: string;

    @Column({ name: 'anamnese_special', default:"" })
    public anamneseSpecial: string;
}
