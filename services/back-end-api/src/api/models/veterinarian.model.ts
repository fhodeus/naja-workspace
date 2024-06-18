import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Service } from 'typedi';
import { Consultation } from './consultation.model';

@Entity()
@Service()
export class Veterinarian {
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

    @CreateDateColumn({ name: 'create_at', type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    public created_at: Date;

    @Column()
    public specialization: string;

    @OneToMany((type) => Consultation, (consultation) => consultation.veterinarian)
    public consultations: Consultation[];
}
