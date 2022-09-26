import express from 'express';
// Controllers
import CatagoryController from '@/controllers/catagory.controller';
// Utils
import { mw } from '@/utils/middleware.util';
// Constants
const router = express.Router();

router.get('/api/catagories', CatagoryController.getAll);
router.get(
  '/api/catagory/all/logged',
  mw(['user']),
  CatagoryController.getAllLogged
);
router.post(
  '/api/category/create',
  mw(['admin']),
  CatagoryController.addCategory
);

export default router;
