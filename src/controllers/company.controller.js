// Business
import CompanyBusiness from '@/business/company.business';
import { success, error } from '@/utils/helper.util';
// Libs
import validator from 'validator';

const getAll = async (req, res) => {
  try {
    // Business logic
    console.log('req.user', req.user);
    const data = await CompanyBusiness.getAll();
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
    const data = await CompanyBusiness.getAllLogged(user_id);
    // Return success
    success(res, data);
  } catch (err) {
    // Return error (if any)
    error(res, err);
  }
};

const getAllAssigned = async (req, res) => {
  try {
    // Get current user id from session
    const accountant_id = req.user.id;

    // Validate data format
    if (!validator.isMongoId(accountant_id)) {
      throw {
        code: 'ERROR_AUTH_4',
        message: 'Invalid auth Accountant id...'
      };
    }
    // Business logic
    console.log('accountant_id', accountant_id);
    const data = await CompanyBusiness.getAllAssigned(accountant_id);
    console.log('data', data);
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
const addCompany = async (req, res) => {
  try {
    console.log('user', req.user);
    req.body.user_id = req.user.id;
    const data = await CompanyBusiness.add(req.body);
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

const UpdateCompany = async (req, res) => {
  try {
    console.log(req.body)
    const data = await CompanyBusiness.update(req.body ,req.params);
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

const DeleteCompany = async (req, res) => {
  try {
    console.log(req.body)
    const data = await CompanyBusiness.Delete(req.body ,req.params);
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

export default { getAll, getAllLogged, addCompany, getAllAssigned ,UpdateCompany ,DeleteCompany};

