import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Pet } from './pet.model';
import { Service } from 'typedi';

@Entity()
@Service()
export class User {
    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @Column({ name: 'full_name' })
    public fullName: string;

    @Column()
    public email: string;

    @Column()
    public address: string;

    @Column()
    public telephone: string;

    @Column()
    public bod: string;

    @Column()
    public document: string;

    @Column()
    public profession: string;

    @Column({ name: 'medical_history' })
    public medicalHistory: string;

    @CreateDateColumn({
        name: 'create_at',
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP(6)',
    })
    public creataAt: string;

    @OneToMany((type) => Pet, (pet) => pet.user)
    public pets: Pet[];
}
