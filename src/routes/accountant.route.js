import express from 'express';
// Controllers
import AccountantController from '@/controllers/accountant.controller';
// Utils
import { mw } from '@/utils/middleware.util';
// Constants
const router = express.Router();

router.post('/api/accountant/login', AccountantController.login);
router.post('/api/accountant/invite', mw(['user']), AccountantController.invite);
router.post('/api/accountant/register', AccountantController.register);
router.post('/api/accountant/recover', AccountantController.recover);
router.get('/api/accountant/me', mw(['accountant']), AccountantController.me);
router.post('/api/accountant/verify', AccountantController.verify);
router.get('/api/accountant/all', mw(['admin']), AccountantController.getAll);
router.post('/api/accountant/create', mw(['admin']), AccountantController.Addaccountent);
router.put('/api/accountant/:id', AccountantController.UpdateAccountent);
router.delete('/api/accountant/:id', AccountantController.DeleteAccountent);


export default router;
