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
    const {  password, name ,phone ,photo ,email ,isSuperAdmin} = req.body;
    console.log('_____body',req.body)
    if (validator.isEmpty(email)) {
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
    console.log('data________')

    const data = await AdminBusiness.register(password, name ,phone ,photo ,email ,isSuperAdmin );
    console.log('data________',data)
    let created = '_id' in data || 'n' in data;
    return success(res, 201, { created });
  } catch (err) {
    error(res, err);
  }
};



const getAll = async (req, res) => {
  try {
    // Business logic
    console.log('req.user', req.user);
    const data = await AdminBusiness.getAll();
    // Return success
    success(res, data);
  } catch (err) {
    // Return error (if any)
    error(res, err);
  }
};

const getAllAdmin = async (req, res) => {
  try {
    // Business logic
    console.log('req.user', req.user);
    const data = await AdminBusiness.getAllAdmin();
    // Return success
    success(res, data);
  } catch (err) {
    // Return error (if any)
    error(res, err);
  }
};

const EditUser = async (req, res) => {
  try {
    console.log(req.body)
    const data = await AdminBusiness.Edit(req.body ,req.params);
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

const DeleteUser = async (req, res) => {
  try {
    console.log(req.body)
    const data = await AdminBusiness.Delete(req.body ,req.params);
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

// const AddAdmin = async (req, res) => {
//   try {
//     console.log(req.body)
//     const data = await AdminBusiness.add(req.body);
//     console.log('data__________',data)

//     let created = '_id' in data || 'n' in data;
//     return success(res, 201, { created });
//   } catch (err) {
//     if (err.code === 11000) {
//       let err = 'Duplicate input';
//       error(res, err);
//     } else {
//       error(res, err);
//     }
//   }
// };


const UpdateAdmin = async (req, res) => {
  try {
    console.log(req.body)
    const data = await AdminBusiness.updateAdmin(req.body ,req.params);
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

const DeleteAdmin = async (req, res) => {
  try {
    console.log(req.body)
    const data = await AdminBusiness.DeleteAdmin(req.body ,req.params);
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

export default { login, register, recover, me, verify ,getAll ,EditUser ,DeleteUser ,UpdateAdmin ,DeleteAdmin , getAllAdmin};
