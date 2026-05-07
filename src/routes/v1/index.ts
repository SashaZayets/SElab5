import { Router } from 'express';
import { 
  createCompany, 
  getCompanyDetails, 
  createBond, 
  createAction 
} from '../../controllers/AssetController';

import auth from './auth';
import users from './users';

const router = Router();

router.use('/auth', auth);
router.use('/users', users);
router.post('/companies', createCompany);
router.get('/companies/:id', getCompanyDetails);
router.post('/bonds', createBond);
router.post('/actions', createAction);

export default router;
