// Business
import companyBusiness from '@/business/company.business';
import fileBusiness from '@/business/file.business';
import FileBusiness from '@/business/file.business';
import { success, error } from '@/utils/helper.util';
// Libs
import validator from 'validator';


const getAll = async (req, res) => {
  try {
    // Business logic
    const data = await FileBusiness.getAll();
    // console.log("data --- ",data)
  //  let abcd =  data.map(i=>{
  //     let  base64data = Buffer.from(i.file.buffer, 'binary').toString('base64');

  //     return {...i,_doc:{...i._doc,file:base64data}
        
  //       // ,file:base64data
  //     }
  //   })
    // Return success
// console.log('base64data______',abcd)
// var newData = (data.replace(data[0].file.buffer),base64data)
// console.log(newData)
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
    const data = await FileBusiness.getAllLogged(user_id);
    // Return success
    success(res, data);
  } catch (err) {
    // Return error (if any)
    error(res, err);
  }
};


const getAllById = async (req, res) => {
  try {
    // Get current user id from session
    const _id = req.params.id;

    // console.log('_id',_id);
    const data = await fileBusiness.getAllById(_id);
    // console.log('data', data);
    // Return success
    success(res, data);
  } catch (err) {
    // Return error (if any)
    error(res, err);
  }
};

const getAllTypeId = async (req, res) => {
  try {
    // Get current user id from session
    const type_id = req.params.type_id;

    console.log('_id',type_id);
    const data = await fileBusiness.getAllTypeId(type_id);
    // console.log('data', data);
    // Return success
    success(res, data);
  } catch (err) {
    // Return error (if any)
    error(res, err);
  }
};

const getAllCompanyId = async (req, res) => {
  try {
    // Get current user id from session
    const {company_id,type_id} = req.params
    
    console.log('_id',company_id);
    const data = await fileBusiness.getAllCompanyId(type_id,company_id);
    // console.log('data', data);
    // Return success
    success(res, data);
  } catch (err) {
    // Return error (if any)
    error(res, err);
  }
};

const Addfile = async (req, res ) => {
  try {
    // console.log(req.body , 'file________')
    const data1 = await companyBusiness.getById(req.body.company_id);
    console.log('data1 ------- ',data1)
    const user_id = req.user.id;
    const data = await FileBusiness.add({...req.body,accountant_id:data1.accountant_id ,user_id});
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

const UpdateFile = async (req, res) => {
  try {
    // console.log(req.body)
    const data = await FileBusiness.update(req.body ,req.params);
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

const DeleteFile = async (req, res) => {
  try {
    console.log(req.body)
    const data = await FileBusiness.Delete(req.body ,req.params);
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

export default { getAll, getAllLogged ,Addfile ,UpdateFile ,DeleteFile ,getAllById ,getAllTypeId , getAllCompanyId};
