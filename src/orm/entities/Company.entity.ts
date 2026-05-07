import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Bond } from './Bond.entity';
import { Action } from './Action.entity';

@Entity('company')
export class Company {
  @PrimaryGeneratedColumn({ name: 'company_id' })
  id: number;

  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'industry' })
  industry: string;

  @Column({ name: 'website', nullable: true })
  website: string;

  @OneToMany(() => Bond, (bond) => bond.company)
  bonds: Bond[];

  @OneToMany(() => Action, (action) => action.company)
  actions: Action[];
}