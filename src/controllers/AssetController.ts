import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Company } from '../orm/entities/Company.entity';
import { Bond } from '../orm/entities/Bond.entity';
import { Action } from '../orm/entities/Action.entity';

export const createCompany = async (req: Request, res: Response) => {
  try {
    const companyRepository = getRepository(Company);
    const company = companyRepository.create(req.body);
    const result = await companyRepository.save(company);
    return res.status(201).json(result);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

export const getCompanyDetails = async (req: Request, res: Response) => {
  try {
    const companyRepository = getRepository(Company);
    const company = await companyRepository.findOne(req.params.id, {
      relations: ['bonds', 'actions'] // Автоматично підтягне облігації та акції
    });
    
    if (!company) return res.status(404).json({ message: 'Company not found' });
    return res.json(company);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

//Додавання облігації до компанії
export const createBond = async (req: Request, res: Response) => {
  try {
    const bondRepository = getRepository(Bond);
    
    const bond = bondRepository.create(req.body as Bond); 

    const result = await bondRepository.save(bond);
    
    return res.status(201).json(result);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

//Додавання акції до компанії
export const createAction = async (req: Request, res: Response) => {
  try {
    const actionRepository = getRepository(Action);

    const action = actionRepository.create(req.body as Action); 

    const result = await actionRepository.save(action);
    return res.status(201).json(result);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};