import express from 'express';
// Controllers
import AccountantController from '@/controllers/accountant.controller';
// Utils
import { mw } from '@/utils/middleware.util';
// Constants
const router = express.Router();

router.post('/api/accountant/login', AccountantController.login);
router.post('/api/accountant/invite', AccountantController.invite);
router.post('/api/accountant/register', AccountantController.register);
router.post('/api/accountant/recover', AccountantController.recover);
router.get('/api/accountant/me', mw(['accountant']), AccountantController.me);
router.post('/api/accountant/verify', AccountantController.verify);
router.get('/api/accountant/all', mw(['admin']), AccountantController.getAll);

export default router;
