import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Company } from './Company.entity';

@Entity('bond')
export class Bond {
    @PrimaryGeneratedColumn()
    bond_id: number;

    @Column()
    industry: string;

    @Column({ name: 'investment_term' })
    investmentTerm: string;

    @Column({ name: 'annual_profit_percent', type: 'numeric' })
    annualProfitPercent: number;

    @Column({ name: 'company_id', nullable: true })
    companyId: number;

    @ManyToOne(() => Company, (company) => company.bonds)
    @JoinColumn({ name: 'company_id' })
    company: Company;
}