// Models
import CompanyModel from '@/models/company.model';

const getAll = async () => {
  // Database query
  return await CompanyModel.find({});
};

const add = async (body) => {
  return await CompanyModel.create(body);
};

const getAllLogged = async (user_id) => {
  // Database query
  return await CompanyModel.find({ user_id });
};

const getAllAssigned = async (accountant_id) => {
  // Database query
  console.log('acc', typeof accountant_id);
  return await CompanyModel.find({ accountant_id: accountant_id });
};

const getAllById = async (_id) => {
  // Database query
  // console.log('acc', typeof accountant_id);
  return await CompanyModel.find({ _id});
};

const update = async (body ,params) => {
  // Database query
  return await CompanyModel.findOneAndUpdate({_id:params.id},body);
};

const Delete = async (body,params) => {
  // Database query
  // var data = await CatagoryModel.find(body);
  // return data
  return await CompanyModel.findOneAndRemove({_id:params.id},body);
};

export default {
  getAll,
  add,
  getAllLogged,
  getAllAssigned,
  update,
  Delete,
  getAllById
};
