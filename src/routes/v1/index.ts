import { Router } from 'express';
import { 
  createCompany, getCompanyDetails, getAllCompanies, updateCompany, deleteCompany,
  createBond, getAllBonds, updateBond, deleteBond, getSortedBonds,
  createAction, getAllActions, updateAction, deleteAction 
} from '../../controllers/AssetController';

import { assetValidator } from '../../middleware/validation/assetValidator';
import { CreateCompanyDto, CreateBondDto, CreateActionDto } from '../../dto/Asset.dto';

import auth from './auth';
import users from './users';

const router = Router();

router.use('/auth', auth);
router.use('/users', users);

router.get('/companies', getAllCompanies);
router.get('/companies/:id', getCompanyDetails);

router.post('/companies', assetValidator(CreateCompanyDto), createCompany);
router.patch('/companies/:id', updateCompany);
router.delete('/companies/:id', deleteCompany);

router.get('/bonds', getAllBonds);
router.post('/bonds', assetValidator(CreateBondDto), createBond);
router.patch('/bonds/:id', updateBond);
router.delete('/bonds/:id', deleteBond);
router.get('/bonds/sorted', getSortedBonds);

router.get('/actions', getAllActions);
router.post('/actions', assetValidator(CreateActionDto), createAction);
router.patch('/actions/:id', updateAction);
router.delete('/actions/:id', deleteAction);

export default router;