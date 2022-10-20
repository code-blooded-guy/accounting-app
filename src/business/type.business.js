// Models
import TypeModal from '@/models/type.model';

const getAll = async () => {
  // Database query
  return await TypeModal.find({});
};

const getAllLogged = async (user_id) => {
  // Database query
  return await TypeModal.find({ user_id });
};

const add = async (body) => {
  // Database query
  return await TypeModal.create(body);
};

const update = async (body ,params) => {
  // Database query
  return await TypeModal.findOneAndUpdate({_id:params.id},body);
};

const Delete = async (body,params) => {
  // Database query
  // var data = await CatagoryModel.find(body);
  // return data
  return await TypeModal.findOneAndRemove({_id:params.id},body);
};

export default {
  getAll,
  getAllLogged,
  add,
  update,
  Delete
};
