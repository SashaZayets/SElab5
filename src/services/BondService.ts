import { getRepository, Repository } from 'typeorm';
import { Bond } from '../orm/entities/Bond.entity';

export class BondService {
  private bondRepository: Repository<Bond>;

  constructor() {
    this.bondRepository = getRepository(Bond);
  }

  async findAll(): Promise<Bond[]> {
    return await this.bondRepository.find();
  }

  async findOne(id: string): Promise<Bond | undefined> {
    return await this.bondRepository.findOne(id);
  }

  async create(data: Partial<Bond>): Promise<Bond> {
    const bond = this.bondRepository.create(data);
    return await this.bondRepository.save(bond);
  }

  async update(id: string, data: Partial<Bond>): Promise<Bond | undefined> {
    await this.bondRepository.update(id, data);
    return this.findOne(id);
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.bondRepository.delete(id);
    return result.affected !== 0;
  }

  async findAllSorted(): Promise<Bond[]> {
    return await this.bondRepository.find({
      order: {
        annualProfitPercent: 'DESC'
      },
      relations: ['company']
    });
  }
}