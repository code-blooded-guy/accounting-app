import express from 'express';
// Controllers
import AdminController from '@/controllers/admin.controller';
// Utils
import { mw } from '@/utils/middleware.util';
// Constants
const router = express.Router();

/**
 * POST /api/admin/login
 * @summary Login user
 * @tags Admin
 * @param {string} username.form.required - email or phone
 * @param {string} password.form.required - user's password
 * @return {object} 200 - Success
 * @return {object} 5XX - Error
 * @example request - example payload
 * {
 *   "username":"user@app.com",
 *   "password":"12345"
 * }
 * @example response - 200 - success response example
 * {
 *     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiI2MDFiNGJmYTU1N2QwODRkMmM3YzhiOTk6c3IySnZWTTkiLCJwZXJtaXNzaW9ucyI6WyJhZG1pbiJdLCJpYXQiOjE2MTI0MDE2ODV9.CfjPZupSqOx7DyayHnlqqy5n5TqAtk4AmOkmRITpFZk"
 * }
 * @example response - 5XX - ERROR_AUTH_1
 * {
 *   "err": {
 *       "code": "ERROR_AUTH_1",
 *       "message": "The username cannot be empty"
 *   }
 * }
 * @example response - 5XX - ERROR_AUTH_2
 * {
 *   "err": {
 *       "code": "ERROR_AUTH_2",
 *       "message": "The password cannot be empty"
 *   }
 * }
 * @example response - 5XX - ERROR_LOGIN_1
 * {
 *   "err": {
 *       "code": "ERROR_LOGIN_1",
 *       "message": "The user has been banned"
 *   }
 * }
 * @example response - 5XX - ERROR_LOGIN_2
 * {
 *   "err": {
 *       "code": "ERROR_LOGIN_2",
 *       "message": "Don't have a password, try in recover password"
 *   }
 * }
 * @example response - 5XX - ERROR_LOGIN_3
 * {
 *   "err": {
 *       "code": "ERROR_LOGIN_3",
 *       "message": "Incorrect password"
 *   }
 * }
 * @example response - 5XX - ERROR_LOGIN_4
 * {
 *   "err": {
 *       "code": "ERROR_LOGIN_4",
 *       "message": "User not found"
 *   }
 * }
 */
router.post('/api/admin/login', AdminController.login);

/**
 * POST /api/admin/register
 * @summary Register user
 * @tags Admin
 * @param {string} username.form.required - email or phone
 * @param {string} password.form.required - user's password
 * @return {object} 200 - Success
 * @return {object} 5XX - Error
 * @example request - example payload
 * {
 *   "username":"user@app.com",
 *   "password":"12345",
 *   "name" :
 * }
 * @example response - 200 - success response example
 * {
 *     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiI1ZmQ0MGFlMjdmNTc4OTI3M2NkMzhlODQ6bzRWYzFUTHAiLCJwZXJtaXNzaW9ucyI6WyJ1c2VyIl0sImlhdCI6MTYxMjU3NjgxNH0._tu9Ycl_WbhFzJZ2_tugJPCfnTUUQs84-eKiElr6Z6o"
 * }
 * @example response - 5XX - ERROR_AUTH_1
 * {
 *   "err": {
 *       "code": "ERROR_AUTH_1",
 *       "message": "The username cannot be empty"
 *   }
 * }
 * @example response - 5XX - ERROR_AUTH_2
 * {
 *   "err": {
 *       "code": "ERROR_AUTH_2",
 *       "message": "The password cannot be empty"
 *   }
 * }
 * @example response - 5XX - ERROR_REGISTER_1
 * {
 *     "err": {
 *         "code": "ERROR_REGISTER_1",
 *         "message": "user@app.com is already registered",
 *         "params": {
 *             "username": "user@app.com"
 *         }
 *     }
 * }
 */
router.post('/api/admin/register', AdminController.register);

/**
 * POST /api/admin/recover
 * @summary Recover password
 * @tags Admin
 * @param {string} username.form.required - email or phone
 * @return {object} 200 - Success
 * @return {object} 5XX - Error
 * @example request - example payload
 * {
 *   "username":"user@app.com"
 * }
 * @example response - 200 - success response example
 * {
 *     "sent": "Sent code to user@app.com"
 * }
 * @example response - 5XX - ERROR_AUTH_1
 * {
 *   "err": {
 *       "code": "ERROR_AUTH_1",
 *       "message": "The username cannot be empty"
 *   }
 * }
 * @example response - 5XX - ERROR_RECOVER_1
 * {
 *     "err": {
 *         "code": "ERROR_RECOVER_1",
 *         "message": "user@app.com is not registered",
 *         "params": {
 *             "username": "user@app.com"
 *         }
 *     }
 * }
 */
router.post('/api/admin/recover', AdminController.recover);

/**
 * GET /api/admin/me
 * @summary Get info of current logged in User
 * @tags Admin
 * @security JWT
 * @return {object} 200 - Success
 * @return {object} 401 - Unadminorized
 * @return {object} 403 - Forbidden
 * @return {object} 5XX - Error
 */
router.get('/api/admin/me', mw(['user']), AdminController.me);
router.get('/api/admin/getAll', mw(['admin']), AdminController.getAll);
router.put('/api/admin/:id', AdminController.EditUser);
router.delete('/api/admin/:id', AdminController.DeleteUser);


router.get('/api/admin/all', AdminController.getAllAdmin);
router.put('/api/admin/all/:id', AdminController.UpdateAdmin);
router.delete('/api/admin/all/:id', AdminController.DeleteAdmin);
// router.post('/api/admin/create', AdminController.AddAdmin);


/**
 * POST /api/admin/verify
 * @summary Verify account
 * @tags Admin
 * @param {string} username.form.required - email or phone
 * @param {string} code.form.required - code
 * @return {object} 200 - Success
 * @return {object} 5XX - Error
 * @example request - example payload
 * {
 *   "username":"user@app.com",
 *   "code":"7410"
 * }
 * @example response - 200 - success response example
 * {
 *     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiI2MDFiNGJmYTU1N2QwODRkMmM3YzhiOTk6MDdxSms4QVciLCJwZXJtaXNzaW9ucyI6WyJhZG1pbiJdLCJpYXQiOjE2MTI0MDY0NDZ9.BCr89sYY3pWY3TgT2MWMZO0bUCpAZpMI0tGCwlVtVvY"
 * }
 * @example response - 5XX - ERROR_AUTH_1
 * {
 *   "err": {
 *       "code": "ERROR_AUTH_1",
 *       "message": "The username cannot be empty"
 *   }
 * }
 * @example response - 5XX - ERROR_AUTH_5
 * {
 *   "err": {
 *       "code": "ERROR_AUTH_5",
 *       "message": "The code cannot be empty"
 *   }
 * }
 * @example response - 5XX - ERROR_VERIFY_1
 * {
 *     "err": {
 *         "code": "ERROR_VERIFY_1",
 *         "message": "Invalid code",
 *         "params": {
 *             "code": "1234"
 *         }
 *     }
 * }
 */
router.post('/api/admin/verify', AdminController.verify);

export default router;
