// Models
import StatusModel from '@/models/status.model';

const getAll = async () => {
  // Database query
  return await StatusModel.find({});
};

const getAllLogged = async (user_id) => {
  // Database query
  return await StatusModel.find({ user_id });
};

const add = async (body) => {
  // Database query
  return await StatusModel.create(body);
};

const update = async (body ,params) => {
  // Database query
  return await StatusModel.findOneAndUpdate({_id:params.id},body);
};

const Delete = async (body,params) => {
  // Database query
  // var data = await CatagoryModel.find(body);
  // return data
  return await StatusModel.findOneAndRemove({_id:params.id},body);
};

export default {
  getAll,
  getAllLogged,
  add,
  update,
  Delete
};
