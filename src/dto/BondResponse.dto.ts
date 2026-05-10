import { Bond } from '../orm/entities/Bond.entity';

export class BondResponseDTO {
  id: number;
  industry: string;
  investmentTerm: number;
  annualProfitPercent: number;
  companyId: number;

  constructor(bond: Bond) {
    this.id = bond.bond_id;
    this.industry = bond.industry;
    this.investmentTerm = bond.investmentTerm;
    this.annualProfitPercent = Number(bond.annualProfitPercent); 
    this.companyId = bond.companyId;
  }
}