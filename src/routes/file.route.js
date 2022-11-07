import express from 'express';
// Controllers
import FileController from '@/controllers/file.controller';
// Utils
import { mw ,fileExtLimiter ,fileSizeLimiter , filesPayloadExists } from '@/utils/middleware.util';
// Constants
import fileUpload from 'express-fileupload';
import  path  from 'path';
import fileController from '@/controllers/file.controller';
import {Binary} from "mongodb"

const router = express.Router();

/**
 * GET /api/file/all
 * @summary Get all file
 * @tags File
 * @return {object} 200 - Success
 * @return {object} 5XX - Error
 * @example response - 200 - success response example
 * [
 *   {
 *     "_id":"60d200765299bd36806d8999",
 *     "name":"Sparky",
 *     "race":"Beagle",
 *     "user_id": "6108db02bb8ea9e69b2984a2",
 *     "created_at":"2021-06-22T15:23:34.521Z"
 *   },
 *   {
 *     "_id":"60d200765299bd36806d899a",
 *     "name":"Zeus",
 *     "race":"Chihuahua",
 *     "user_id": "6108db02bb8ea9e69b2984a2",
 *     "created_at":"2021-06-22T15:23:34.522Z"
 *   },
 *   {
 *     "_id":"60d200765299bd36806d899b",
 *     "name":"Poseidon",
 *     "race":"Bullfile",
 *     "user_id": "6108db02bb8ea9e69b2984a2",
 *     "created_at":"2021-06-22T15:23:34.523Z"
 *   }
 * ]
 */
router.get('/api/file/all', FileController.getAll);
router.put('/api/file/:id', FileController.UpdateFile);
router.delete('/api/file/:id', FileController.DeleteFile);

router.post('/upload',
    fileUpload({ createParentPath: true }),
    filesPayloadExists,
    // fileExtLimiter(['.png', '.jpg', '.jpeg']),
    fileSizeLimiter,
    fileController.Addfile
)


// router.post('/upload', upload.single('file'), (req, res) => {           
//     var user = req.body;
//     user.avatar = req.file;   //img file in the req.file
//     fileBusiness.add(user, (err, user) => {
//         if(err) throw err;
//         res.json({
//             success: true,
//             user: user
//         });
//     })
// });
/**
 * GET /api/file/all/logged
 * @summary  Get all file (logged)
 * @security JWT
 * @tags File
 * @return {object} 200 - Success
 * @return {object} 401 - Unauthorized
 * @return {object} 403 - Forbidden
 * @return {object} 5XX - Error
 * @example response - 200 - success response example
 * [
 *   {
 *     "_id":"60d200765299bd36806d8999",
 *     "name":"Sparky",
 *     "race":"Beagle",
 *     "user_id": "6108db02bb8ea9e69b2984a2",
 *     "created_at":"2021-06-22T15:23:34.521Z"
 *   },
 *   {
 *     "_id":"60d200765299bd36806d899a",
 *     "name":"Zeus",
 *     "race":"Chihuahua",
 *     "user_id": "6108db02bb8ea9e69b2984a2",
 *     "created_at":"2021-06-22T15:23:34.522Z"
 *   },
 *   {
 *     "_id":"60d200765299bd36806d899b",
 *     "name":"Poseidon",
 *     "race":"Bullfile",
 *     "user_id": "6108db02bb8ea9e69b2984a2",
 *     "created_at":"2021-06-22T15:23:34.523Z"
 *   }
 * ]
 */
router.get('/api/file/all/logged', mw(['user']), FileController.getAllLogged);

export default router;
