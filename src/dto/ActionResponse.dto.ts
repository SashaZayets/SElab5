import { Action } from '../orm/entities/Action.entity';

export class ActionResponseDTO {
  id: number;
  name: string;
  industry: string;
  price: number;
  companyId: number;

  constructor(action: Action) {
    this.id = action.action_id;
    this.name = action.name;
    this.industry = action.industry;
    this.price = Number(action.price);
    this.companyId = action.companyId;
  }
}