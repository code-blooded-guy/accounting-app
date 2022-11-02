// Models
import CatagoryModel from '@/models/catagory.model';

const getAll = async () => {
  // Database query
  return await CatagoryModel.find({});
};

const getAllLogged = async (user_id) => {
  // Database query
  return await CatagoryModel.find({ user_id });
};

const add = async (body) => {
  // Database query
  return await CatagoryModel.create(body);
};

const update = async (body ,params) => {
  // Database query
  return await CatagoryModel.findOneAndUpdate({_id:params.id},body);
};


const Delete = async (body,params) => {
  // Database query
  // var data = await CatagoryModel.find(body);
  // return data
  return await CatagoryModel.findOneAndRemove({_id:params.id},body);
};

export default {
  getAll,
  getAllLogged,
  add,
  update,
  Delete
};
