import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { Service } from 'typedi';

@Entity()
@Service()
export class Financial {
    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @Column()
    public month: string;

    @CreateDateColumn({
        name: 'start_time',
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP(6)',
    })
    public startTime: string;

    @CreateDateColumn({
        name: 'end_time',
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP(6)',
    })
    public endTime: string;

    @Column({ default: '' })
    public status: string;
}
