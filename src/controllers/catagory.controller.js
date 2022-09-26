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
    const data = await CatagoryBusiness.add(req.body);
    let created = '_id' in data || 'n' in data;
    return success(res, 201, { created });
  } catch (err) {
    if (err.code === 11000) {
      let error = 'Duplicate input';
      error(res, error);
    } else {
      error(res, err);
    }
  }
};

export default { getAll, getAllLogged, addCategory };
