import validator from 'validator';
// Business
import AuthBusiness from '@/business/auth.business';
// Utils
import { session } from '@/utils/auth.util';
import { success, error, unauthorized } from '@/utils/helper.util';
import admin from 'firebase-admin';
import { async } from '@babel/runtime/helpers/regeneratorRuntime';
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

    const user = await AuthBusiness.login(username, password);
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
const register = (req, res) => {
  try {
    const { username, name } = req.body;
    console.log(username, name );

    if (validator.isEmpty(username)) {
      throw {
        code: 'ERROR_AUTH_1',
        message: 'The username cannot be empty'
      };
    }

    // if (validator.isEmpty(password)) {
    //   throw {
    //     code: 'ERROR_AUTH_2',
    //     message: 'The password cannot be empty'
    //   };
    // }

      admin
      .auth()
      .getUserByPhoneNumber(username)
      .then((response) => {
        console.log(response.uid);
        const password = response.uid;
        if (password) {
          const data = AuthBusiness.register(
            username,
            password,
            name,
            // response.uid
            // email,
            // phone
          )
            .then((a) => {
              console.log('a ------ ', a);
              let created = '_id' in a || 'n' in a;
              return success(res, 201, { created });
            })
            .catch((err) => {
              error(res, err);
            });
        }
      })
      .catch((err) => {
        error(res, err.errorInfo);
      });
  } catch (err) {
    error(res, err);
  }
};

const uploadFile = async (req, res) => {
  try {
    // console.log(req.body , 'file________')
    const data = await AuthBusiness.add(req.body);
    // console.log('data__________',data)

    let created = '_id' in data || 'n' in data;
    return success(res, 201, { created });
  } catch (err) {
    if (err.code === 11000) {
      let err = 'Duplicate input';
      error(res, err);
    } else {
      error(res, err);
    }
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

    const data = await AuthBusiness.recover(username);
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
        message: 'The User id cannot be empty'
      };
    }

    if (!validator.isMongoId(user_id)) {
      throw {
        code: 'ERROR_AUTH_4',
        message: 'Invalid auth User id...'
      };
    }
    console.log(user_id, 'userID');
    if (user_id) {
      let data = await AuthBusiness.me(user_id);
      console.log(data, 'dataa');

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

    const user = await AuthBusiness.verify(username, code);
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

const check = async (req, res) => {
  try {
    const { username } = req.body;

    if (validator.isEmpty(username)) {
      throw {
        code: 'ERROR_AUTH_1',
        message: 'The username cannot be empty'
      };
    }
    const user = await AuthBusiness.check(username);
    console.log('user', user);
    return success(res, 201, { exist: user });
  } catch (err) {
    error(res, err);
  }
};

const update = async (req, res) => {
  try {
    const { username } = req.body;

    if (validator.isEmpty(username)) {
      throw {
        code: 'ERROR_AUTH_1',
        message: 'The username cannot be empty'
      };
    }
    const user = await AuthBusiness.update(username);
    console.log('user', user);
    return success(res, 201, { exist: user });
  } catch (err) {
    error(res, err);
  }
};

const getAll = async (req, res) => {
  try {
    // Business logic
    const data = await AuthBusiness.getAll();
    // Return success
    success(res, data);
  } catch (err) {
    // Return error (if any)
    error(res, err);
  }
};

export default {
  getAll,
  update,
  login,
  register,
  recover,
  me,
  verify,
  check,
  uploadFile
};
