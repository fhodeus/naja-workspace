import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Pet } from './pet.entity';
import { BaseEntity } from 'src/module/_shared/base/base.entity';

@Entity({ name: 'user' })
export class User extends BaseEntity {
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

    @OneToMany(() => Pet, (pet) => pet.user)
    public pets: Pet[];
}
