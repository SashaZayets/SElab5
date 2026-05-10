import { Request, Response } from 'express';
import { CompanyService } from '../services/CompanyService';
import { BondService } from '../services/BondService';
import { ActionService } from '../services/ActionService';

import { CompanyResponseDTO } from '../dto/CompanyResponse.dto';
import { BondResponseDTO } from '../dto/BondResponse.dto';
import { ActionResponseDTO } from '../dto/ActionResponse.dto';

//Комппанії
export const createCompany = async (req: Request, res: Response) => {
  try {
    const companyService = new CompanyService();
    const result = await companyService.create(req.body);
    return res.status(201).json(new CompanyResponseDTO(result));
  } catch (err: any) {
    return res.status(400).json({ message: err.message });
  }
};

export const getCompanyDetails = async (req: Request, res: Response) => {
  try {
    const companyService = new CompanyService();
    const company = await companyService.findOne(req.params.id);
    if (!company) return res.status(404).json({ message: 'Company not found' });
    return res.json(new CompanyResponseDTO(company));
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
};

export const getAllCompanies = async (req: Request, res: Response) => {
  try {
    const companyService = new CompanyService();
    const companies = await companyService.findAll();
    return res.json(companies.map(c => new CompanyResponseDTO(c)));
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
};

export const updateCompany = async (req: Request, res: Response) => {
  try {
    const companyService = new CompanyService();
    const updated = await companyService.update(req.params.id, req.body);
    return res.json(new CompanyResponseDTO(updated));
  } catch (err: any) {
    return res.status(400).json({ message: err.message });
  }
};

export const deleteCompany = async (req: Request, res: Response) => {
  try {
    const companyService = new CompanyService();
    const success = await companyService.delete(req.params.id);
    if (!success) return res.status(404).json({ message: "Компанію не знайдено" });
    return res.status(204).send();
  } catch (err: any) {
    return res.status(400).json({ 
      message: "Неможливо видалити компанію: у неї є активні активи.",
      details: err.detail 
    });
  }
};

//Облігації
export const createBond = async (req: Request, res: Response) => {
  try {
    const bondService = new BondService();
    const result = await bondService.create(req.body);
    return res.status(201).json(new BondResponseDTO(result));
  } catch (err: any) {
    return res.status(400).json({ message: err.message });
  }
};

export const getAllBonds = async (req: Request, res: Response) => {
  try {
    const bondService = new BondService();
    const bonds = await bondService.findAll();
    return res.json(bonds.map(b => new BondResponseDTO(b)));
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
};

export const updateBond = async (req: Request, res: Response) => {
  try {
    const bondService = new BondService();
    const updated = await bondService.update(req.params.id, req.body);
    return res.json(new BondResponseDTO(updated));
  } catch (err: any) {
    return res.status(400).json({ message: err.message });
  }
};

export const deleteBond = async (req: Request, res: Response) => {
  try {
    const bondService = new BondService();
    const success = await bondService.delete(req.params.id);
    if (!success) return res.status(404).json({ message: "Облігацію не знайдено" });
    return res.status(204).send();
  } catch (err: any) {
    return res.status(400).json({ message: err.message });
  }
};

export const getSortedBonds = async (req: Request, res: Response) => {
    const service = new BondService();
    const bonds = await service.findAllSorted();
    res.json(bonds);
};

//Акції
export const createAction = async (req: Request, res: Response) => {
  try {
    const actionService = new ActionService();
    const result = await actionService.create(req.body);
    return res.status(201).json(new ActionResponseDTO(result));
  } catch (err: any) {
    return res.status(400).json({ message: err.message });
  }
};

export const getAllActions = async (req: Request, res: Response) => {
  try {
    const actionService = new ActionService();
    const actions = await actionService.findAll();
    return res.json(actions.map(a => new ActionResponseDTO(a)));
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
};

export const updateAction = async (req: Request, res: Response) => {
  try {
    const actionService = new ActionService();
    const updated = await actionService.update(req.params.id, req.body);
    return res.json(new ActionResponseDTO(updated));
  } catch (err: any) {
    return res.status(400).json({ message: err.message });
  }
};

export const deleteAction = async (req: Request, res: Response) => {
  try {
    const actionService = new ActionService();
    const success = await actionService.delete(req.params.id);
    if (!success) return res.status(404).json({ message: "Акцію не знайдено" });
    return res.status(204).send();
  } catch (err: any) {
    return res.status(400).json({ message: err.message });
  }
};