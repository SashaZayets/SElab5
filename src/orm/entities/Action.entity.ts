import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Company } from './Company.entity';

@Entity('action') 
export class Action {
    @PrimaryGeneratedColumn()
    action_id: number;

    @Column()
    name: string;

    @Column({ type: 'numeric', name: 'price' })
    price: number;

    @Column({ name: 'industry' })
    industry: string;

    @Column({ name: 'company_id', nullable: true })
    companyId: number;

    @ManyToOne(() => Company, (company) => company.actions)
    @JoinColumn({ name: 'company_id' })
    company: Company;
}