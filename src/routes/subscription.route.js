import express from 'express';
// Controllers
import SubscriptionController from '@/controllers/subscription.controller';
// Utils
import { mw } from '@/utils/middleware.util';
// Constants
const router = express.Router();

/**
 * GET /api/subscription/all
 * @summary Get all subscription
 * @tags Subscription
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
 *     "race":"Bullsubscription",
 *     "user_id": "6108db02bb8ea9e69b2984a2",
 *     "created_at":"2021-06-22T15:23:34.523Z"
 *   }
 * ]
 */
router.get('/api/subscription/all', SubscriptionController.getAll);

/**
 * GET /api/subscription/all/logged
 * @summary  Get all subscription (logged)
 * @security JWT
 * @tags Subscription
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
 *     "race":"Bullsubscription",
 *     "user_id": "6108db02bb8ea9e69b2984a2",
 *     "created_at":"2021-06-22T15:23:34.523Z"
 *   }
 * ]
 */
router.get(
  '/api/subscription/all/logged',
  mw(['user']),
  SubscriptionController.getAllLogged
);

export default router;
