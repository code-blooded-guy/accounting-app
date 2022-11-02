import express from 'express';
// Controllers
import TypeController from '@/controllers/type.controller';
// Utils
import { mw } from '@/utils/middleware.util';
// Constants
const router = express.Router();

/**
 * GET /api/type/all
 * @summary Get all type
 * @tags Type
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
 *     "race":"Bulltype",
 *     "user_id": "6108db02bb8ea9e69b2984a2",
 *     "created_at":"2021-06-22T15:23:34.523Z"
 *   }
 * ]
 */
router.get('/api/type/all', TypeController.getAll);

router.post(
    '/api/type/create',
    mw(['admin']),
    TypeController.AddType
  );

 router.put('/api/type/:id', TypeController.UpdateType);

 router.delete('/api/type/:id', TypeController.DeleteType);


/**
 * GET /api/type/all/logged
 * @summary  Get all type (logged)
 * @security JWT
 * @tags Type
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
 *     "race":"Bulltype",
 *     "user_id": "6108db02bb8ea9e69b2984a2",
 *     "created_at":"2021-06-22T15:23:34.523Z"
 *   }
 * ]
 */
router.get('/api/type/all/logged', mw(['user']), TypeController.getAllLogged);

export default router;
