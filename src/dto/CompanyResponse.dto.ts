import { Company } from '../orm/entities/Company.entity';

export class CompanyResponseDTO {
  id: number;
  name: string;
  industry: string;
  website: string;

  constructor(company: Company) {
    this.id = company.id;
    this.name = company.name;
    this.industry = company.industry;
    this.website = company.website;
  }
}