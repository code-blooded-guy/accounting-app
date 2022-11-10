
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

router.get(
  '/api/company/accountant/:id',
  mw(['accountant']),
  CompanyController.getAllById
);

router.post(
  '/api/company/create',
  mw(['user', 'admin']),
  CompanyController.addCompany
);

router.put(
  '/api/company/:id', CompanyController.UpdateCompany
);

router.delete(
  '/api/company/:id', CompanyController.DeleteCompany
);

export default router;
