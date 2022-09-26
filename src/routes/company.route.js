import express from 'express';
// Controllers
import CompanyController from '@/controllers/company.controller';
// Utils
import { mw } from '@/utils/middleware.util';
// Constants
const router = express.Router();

router.get('/api/company/all', mw(['admin']), CompanyController.getAll);
router.get('/api/company/user', mw(['user']), CompanyController.getAllLogged);
router.get(
  '/api/company/accountant',
  mw(['accountant']),
  CompanyController.getAllAssigned
);

router.post(
  '/api/company/create',
  mw(['user', 'admin']),
  CompanyController.addCompany
);

export default router;
