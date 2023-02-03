import validator from 'validator';
// Business
import AccountantBusiness from '@/business/accountant.business';
// Utils
import { session } from '@/utils/auth.util';
import { success, error, unauthorized } from '@/utils/helper.util';
import accountantBusiness from '@/business/accountant.business';

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
console.log(req.body);
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
console.log('user');
    const user = await AccountantBusiness.login(username, password);
    console.log(user,'user');
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

    const data = await AccountantBusiness.register(username, password, name);
    let created = '_id' in data || 'n' in data;
    return success(res, 201, { created });
  } catch (err) {
    error(res, err);
  }
};

/**
 * invite
 *
 * @param {*} req
 * @param {*} res
 * @returns
 */
const invite = async (req, res) => {
  try {
    const { username, company_id } = req.body;
    console.log('1', company_id);
    const password = null;
    const name = 'Invited Member';
    if (validator.isEmpty(username)) {
      throw {
        code: 'ERROR_AUTH_1',
        message: 'The username cannot be empty'
      };
    }

    const data = await AccountantBusiness.register(
      username,
      password,
      name,
      company_id
    );
    console.log('account data',data)
    let invited = '_id' in data || 'n' in data;

    return success(res, 201, { invited });
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

    const data = await AccountantBusiness.recover(username);
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
        message: 'The Accountant id cannot be empty'
      };
    }

    if (!validator.isMongoId(user_id)) {
      throw {
        code: 'ERROR_AUTH_4',
        message: 'Invalid accountant Accountant id...'
      };
    }

    if (user_id) {
      let data = await AccountantBusiness.me(user_id);
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

    const user = await AccountantBusiness.verify(username, code);
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
const getAll = async (req, res) => {
  try {
    // Business logic
    console.log('req.user', req.user);
    const data = await AccountantBusiness.getAll();
    // Return success
    success(res, data);
  } catch (err) {
    // Return error (if any)
    error(res, err);
  }
};

const Addaccountent = async (req, res) => {
  try {
    // console.log("photo ------- ",req.body)
    
    const data = await accountantBusiness.add(req.body);
    // console.log("data ---------------------------- ",data.photo)

    let created = '_id' in data || 'n' in data;
    // console.log("created ---------------------------- ",created)

    return success(res, 201, { created });
  } catch (err) {
    // console.log("err ---------------------------- ",err)

    if (err.code === 11000) {
      let err = 'Duplicate input';
      error(res, err);
    } else {
      error(res, err);
    }
  }
};

const UpdateAccountent = async (req, res) => {
  try {
    console.log(req.body)
    const data = await accountantBusiness.update(req.body ,req.params);
    let updated = '_id' in data || 'n' in data;
    return success(res, 201, { updated });
  } catch (err) {
    if (err.code === 11000) {
      let err = 'Duplicate input';
      error(res, err);
    } else {
      error(res, err);
    }
  }
};

const DeleteAccountent = async (req, res) => {
  try {
    console.log(req.body)
    const data = await accountantBusiness.Delete(req.body ,req.params);
    let deleted = '_id' in data || 'n' in data;
    return success(res, 201 , { deleted });
  } catch (err) {
    if (err.code === 11000) {
      // let err = 'Duplicate input';
      error(res);
    } else {
      error(res, err);
    }
  }
};

export default { login, register, recover, me, verify, invite, getAll ,Addaccountent ,UpdateAccountent ,DeleteAccountent};
