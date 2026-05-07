import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Company } from '../orm/entities/Company.entity';
import { Bond } from '../orm/entities/Bond.entity';
import { Action } from '../orm/entities/Action.entity';


//Компанії
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
      relations: ['bonds', 'actions']
    });
    
    if (!company) return res.status(404).json({ message: 'Company not found' });
    return res.json(company);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const getAllCompanies = async (req: Request, res: Response) => {
  const companies = await getRepository(Company).find({ relations: ['bonds', 'actions'] });
  return res.json(companies);
};

export const updateCompany = async (req: Request, res: Response) => {
  const repo = getRepository(Company);
  await repo.update(req.params.id, req.body);
  const updated = await repo.findOne(req.params.id);
  return res.json(updated);
};

export const deleteCompany = async (req: Request, res: Response) => {
  try {
    const repo = getRepository(Company);
    const id = req.params.id;

    const company = await repo.findOne(id);
    if (!company) {
      return res.status(404).json({ message: "Компанію не знайдено" });
    }

    await repo.delete(id);

    return res.status(204).send();

  } catch (err) {
    return res.status(400).json({ 
      status: "error",
      message: "Неможливо видалити компанію: у неї є активні облігації або акції. Спершу видаліть активи.",
      details: err.detail
    });
  }
};

//Облігації
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

export const getAllBonds = async (req: Request, res: Response) => {
  const bonds = await getRepository(Bond).find();
  return res.json(bonds);
};

export const updateBond = async (req: Request, res: Response) => {
  const repo = getRepository(Bond);
  await repo.update(req.params.id, req.body);
  const updated = await repo.findOne(req.params.id);
  return res.json(updated);
};

export const deleteBond = async (req: Request, res: Response) => {
  await getRepository(Bond).delete(req.params.id);
  return res.status(204).send();
};

//Акції
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

export const getAllActions = async (req: Request, res: Response) => {
  const actions = await getRepository(Action).find();
  return res.json(actions);
};

export const updateAction = async (req: Request, res: Response) => {
  const repo = getRepository(Action);
  await repo.update(req.params.id, req.body);
  const updated = await repo.findOne(req.params.id);
  return res.json(updated);
};

export const deleteAction = async (req: Request, res: Response) => {
  await getRepository(Action).delete(req.params.id);
  return res.status(204).send();
};