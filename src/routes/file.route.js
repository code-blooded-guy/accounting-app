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

router.post('/upload',
    fileUpload({ createParentPath: true }),
    filesPayloadExists,
    // fileExtLimiter(['.png', '.jpg', '.jpeg']),
    fileSizeLimiter,
    (req, res) => {
        console.log('first______',req.body )
        const files = req.body.file
        // console.log(files)
        var bindata = new Buffer(files.split(",")[1],"base64");
        // var bindata = new Buffer([10,20,30]);
        // console.log(bindata)


     fileController.Addfile(req , res,bindata )

        // Object.keys(files).forEach(key => {
        //     console.log(files[key] ,'files')

        //     const filepath = path.join(__dirname, 'files', files[key].name)
        //     console.log(filepath ,'path')
        //     files[key].mv(filepath, (err) => {
        //         if (err) return res.status(500).json({ status: "error", message: err })
        //     })
        // })

        // return res.json({ status: 'success', message: Object.keys(files).toString() })
    }
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
