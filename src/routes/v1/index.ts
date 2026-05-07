import { Router } from 'express';
import { 
  createCompany, getCompanyDetails, getAllCompanies, updateCompany, deleteCompany,
  createBond, getAllBonds, updateBond, deleteBond,
  createAction, getAllActions, updateAction, deleteAction 
} from '../../controllers/AssetController';

import auth from './auth';
import users from './users';

const router = Router();

router.use('/auth', auth);
router.use('/users', users);

router.get('/companies', getAllCompanies);
router.get('/companies/:id', getCompanyDetails);
router.post('/companies', createCompany);
router.patch('/companies/:id', updateCompany);
router.delete('/companies/:id', deleteCompany);

router.get('/bonds', getAllBonds);
router.post('/bonds', createBond);
router.patch('/bonds/:id', updateBond);
router.delete('/bonds/:id', deleteBond);

router.get('/actions', getAllActions);
router.post('/actions', createAction);
router.patch('/actions/:id', updateAction);
router.delete('/actions/:id', deleteAction);

export default router;
