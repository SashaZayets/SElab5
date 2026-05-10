import { getRepository, Repository } from 'typeorm';
import { Action } from '../orm/entities/Action.entity';

export class ActionService {
  private actionRepository: Repository<Action>;

  constructor() {
    this.actionRepository = getRepository(Action);
  }

  async findAll(): Promise<Action[]> {
    return await this.actionRepository.find();
  }

  async findOne(id: string): Promise<Action | undefined> {
    return await this.actionRepository.findOne(id);
  }

  async create(data: Partial<Action>): Promise<Action> {
    const action = this.actionRepository.create(data);
    return await this.actionRepository.save(action);
  }

  async update(id: string, data: Partial<Action>): Promise<Action | undefined> {
    await this.actionRepository.update(id, data);
    return this.findOne(id);
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.actionRepository.delete(id);
    return result.affected !== 0;
  }
}