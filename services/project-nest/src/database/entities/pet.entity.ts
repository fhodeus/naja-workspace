import { Column, CreateDateColumn, JoinColumn, ManyToOne, OneToMany, Entity } from 'typeorm';
import { User } from './user.entity';
import { Consultation } from './consultation.entity';
import { BaseEntity } from 'src/module/_shared/base/base.entity';

@Entity({ name: 'pet' })
export class Pet extends BaseEntity {
    @Column()
    public name: string;

    @Column()
    public age: number;

    @Column()
    public dob: string;

    @Column()
    public breed: string;

    @Column()
    public species: string;

    @Column()
    public gender: string;

    @Column()
    public weight: string;

    @Column()
    public size: string;

    @Column({ name: 'health_history' })
    public healthHistory: string;

    @Column({ name: 'allergies_and_medications' })
    public allergiesAndMedications: string;

    @CreateDateColumn({
        name: 'create_at',
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP(6)',
    })
    public createAt: string;

    @Column()
    public microchip: string;

    @Column({ name: 'special_notes' })
    public specialNotes: string;

    @Column({ name: 'last_visit' })
    public lastVisit: string;

    @Column({ name: 'user_id', nullable: true })
    public userId: string;

    @ManyToOne(() => User, (user) => user.pets)
    @JoinColumn({ name: 'user_id' })
    public user: User;

    @OneToMany(() => Consultation, (consultation) => consultation.pet)
    public consultations: Consultation[];
}
