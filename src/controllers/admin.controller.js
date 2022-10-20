import validator from 'validator';
// Business
import AdminBusiness from '@/business/admin.business';
// Utils
import { session } from '@/utils/auth.util';
import { success, error, unauthorized } from '@/utils/helper.util';

/**
 * login
 *
 * @param {*} req
 * @param {*} res
 * @returns
 */
const login = async (req, res) => {
  try {
    const { username, password } = req.body;
// console.log(username, password)
    if (validator.isEmpty(username)) {
      throw {
        code: 'ERROR_AUTH_1',
        message: 'The username cannot be empty'
      };
    }

    if (validator.isEmpty(password)) {
      throw {
        code: 'ERROR_AUTH_2',
        message: 'The password cannot be empty'
      };
    }

    const user = await AdminBusiness.login(username, password);
    if (user) {
      const { _id, permissions } = user;
      const token = await session(_id, { permissions });
      return success(res, { token });
    } else {
      return unauthorized(res);
    }
  } catch (err) {
    error(res, err);
  }
};

/**
 * register
 *
 * @param {*} req
 * @param {*} res
 * @returns
 */
const register = async (req, res) => {
  try {
    const { username, password, name } = req.body;

    if (validator.isEmpty(username)) {
      throw {
        code: 'ERROR_AUTH_1',
        message: 'The username cannot be empty'
      };
    }

    if (validator.isEmpty(password)) {
      throw {
        code: 'ERROR_AUTH_2',
        message: 'The password cannot be empty'
      };
    }

    const data = await AdminBusiness.register(username, password, name);
    let created = '_id' in data || 'n' in data;
    return success(res, 201, { created });
  } catch (err) {
    error(res, err);
  }
};

/**
 * recover
 *
 * @param {*} req
 * @param {*} res
 * @returns
 */
const recover = async (req, res) => {
  try {
    const { username } = req.body;

    if (validator.isEmpty(username)) {
      throw {
        code: 'ERROR_AUTH_1',
        message: 'The username cannot be empty'
      };
    }

    const data = await AdminBusiness.recover(username);
    return success(res, data);
  } catch (err) {
    error(res, err);
  }
};

/**
 * me
 *
 * @param {*} req
 * @param {*} res
 * @returns
 */
const me = async (req, res) => {
  try {
    const user_id = req.user.id;

    if (validator.isEmpty(user_id)) {
      throw {
        code: 'ERROR_AUTH_3',
        message: 'The Admin id cannot be empty'
      };
    }

    if (!validator.isMongoId(user_id)) {
      throw {
        code: 'ERROR_AUTH_4',
        message: 'Invalid admin Admin id...'
      };
    }

    if (user_id) {
      let data = await AdminBusiness.me(user_id);
      return data ? success(res, data) : unauthorized(res);
    } else {
      return unauthorized(res);
    }
  } catch (err) {
    error(res, err);
  }
};

/**
 * verify
 *
 * @param {*} req
 * @param {*} res
 * @returns
 */
const verify = async (req, res) => {
  try {
    const { username, code } = req.body;

    if (validator.isEmpty(username)) {
      throw {
        code: 'ERROR_AUTH_1',
        message: 'The username cannot be empty'
      };
    }

    if (validator.isEmpty(code)) {
      throw {
        code: 'ERROR_AUTH_5',
        message: 'The code cannot be empty'
      };
    }

    const user = await AdminBusiness.verify(username, code);
    if (user) {
      const { _id, permissions } = user;
      const token = await session(_id, { permissions });
      return success(res, { token });
    } else {
      return unauthorized(res);
    }
  } catch (err) {
    error(res, err);
  }
};

export default { login, register, recover, me, verify };
