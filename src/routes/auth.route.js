import express from 'express';
// Controllers
import AuthController from '@/controllers/auth.controller';
// Utils
import { mw ,fileExtLimiter ,fileSizeLimiter , filesPayloadExists} from '@/utils/middleware.util';
import fileUpload from 'express-fileupload';

import cors from 'cors';
    const app = express();
    // enable CORS - Cross Origin Resource Sharing
    // app.use(cors({ origin: 'http://127.0.0.1:4200' }));
    // app.use(cors({ origin: '*' }));

    app.use(cors({ origin: '*' })); 

// Constants
const router = express.Router();

router.post('/api/auth/login', AuthController.login);
router.post('/api/auth/register', AuthController.register);

// router.post('/api/auth/edit', AuthController.edit);
router.put( '/api/auth/:id', AuthController.update );
//router.get( '/api/auth/all', mw(['admin']), AuthController.all);
  
router.post('/api/auth/recover', AuthController.recover);
router.get('/api/auth/me', mw(['user']), AuthController.me);
router.post('/api/auth/verify', AuthController.verify);
router.post('/api/auth/check', AuthController.check);
// router.post('/upload',mw(['user']),
//     fileUpload({ createParentPath: true }),
//     filesPayloadExists,
//     // fileExtLimiter(['.png', '.jpg', '.jpeg' ,'.pdf']),
//     fileSizeLimiter,
//     AuthController.uploadFile
// )

export default router;
