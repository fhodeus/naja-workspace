import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Consultation } from './consultation.entity';
import { BaseEntity } from 'src/module/_shared/base/base.entity';

@Entity({ name: 'veterinarian' })
export class Veterinarian extends BaseEntity {
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

    @Column({ name: 'medical_history' })
    public medicalHistory: string;

    @Column({ name: 'professional_record' })
    public professionalRecord: string;

    @CreateDateColumn({
        name: 'create_at',
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP(6)',
    })
    public created_at: Date;

    @Column()
    public specialization: string;

    @OneToMany(() => Consultation, (consultation) => consultation.veterinarian)
    public consultations: Consultation[];
}
