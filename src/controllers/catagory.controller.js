// Business
import CatagoryBusiness from '@/business/catagory.business';
import { success, error } from '@/utils/helper.util';
// Libs
import validator from 'validator';

const getAll = async (req, res) => {
  try {
    // Business logic
    const data = await CatagoryBusiness.getAll();
    // Return success
    success(res, data);
  } catch (err) {
    // Return error (if any)
    error(res, err);
  }
};

const getAllLogged = async (req, res) => {
  try {
    // Get current user id from session
    const user_id = req.user.id;
    // Validate data format
    if (!validator.isMongoId(user_id)) {
      throw {
        code: 'ERROR_AUTH_4',
        message: 'Invalid auth User id...'
      };
    }
    // Business logic
    const data = await CatagoryBusiness.getAllLogged(user_id);
    // Return success
    success(res, data);
  } catch (err) {
    // Return error (if any)
    error(res, err);
  }
};

/**
 * Add Company
 *
 * @param {*} req
 * @param {*} res
 * @returns
 */

const addCategory = async (req, res) => {
  try {
    console.log(req.body)
    const data = await CatagoryBusiness.add(req.body);
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

const UpdateCategory = async (req, res) => {
  try {
    console.log(req.body)
    const data = await CatagoryBusiness.update(req.body ,req.params);
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


const DeleteCategory = async (req, res) => {
  try {
    console.log(req.body)
    const data = await CatagoryBusiness.Delete(req.body ,req.params);
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

export default { getAll, getAllLogged, addCategory ,UpdateCategory ,DeleteCategory};
