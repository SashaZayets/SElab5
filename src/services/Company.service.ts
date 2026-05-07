import { AppDataSource } from '../data-source';
import { Company } from '../entities/Company.entity';

export class CompanyService {
  private repository = AppDataSource.getRepository(Company);

  async getCompanyDetails(id: number) {
    return await this.repository.findOne({
      where: { id },
      // Це замінює складні SQL Join запити
      relations: ['bonds', 'actions'] 
    });
  }
}