import { getRepository, Repository } from 'typeorm';
import { Company } from '../orm/entities/Company.entity';

export class CompanyService {
  private companyRepository: Repository<Company>;

  constructor() {
    this.companyRepository = getRepository(Company);
  }

  async findAll(): Promise<Company[]> {
    return await this.companyRepository.find({ relations: ['bonds', 'actions'] });
  }

  async findOne(id: string): Promise<Company | undefined> {
    return await this.companyRepository.findOne(id, { relations: ['bonds', 'actions'] });
  }

  async create(data: Partial<Company>): Promise<Company> {
    const company = this.companyRepository.create(data);
    return await this.companyRepository.save(company);
  }

  async update(id: string, data: Partial<Company>): Promise<Company | undefined> {
    await this.companyRepository.update(id, data);
    return this.findOne(id);
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.companyRepository.delete(id);
    return result.affected !== 0;
  }
}