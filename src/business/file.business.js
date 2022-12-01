// Models
import FileModel from '@/models/file.model';

const getAll = async () => {
  // Database query
  return await FileModel.find({});
};

const getAllLogged = async (user_id) => {
  // Database query
  return await FileModel.find({ user_id });
};

const add = async (body) => {
  // Database query
  return await FileModel.create(body);
};

const update = async (body ,params) => {
  // Database query
  return await FileModel.findOneAndUpdate({_id:params.id},body);
};

const Delete = async (body,params) => {
  // Database query
  // var data = await CatagoryModel.find(body);
  // return data
  return await FileModel.findOneAndRemove({_id:params.id},body);
};


const getAllById = async (_id) => {
  
  return await FileModel.findOne({ _id});
};

const getAllTypeId = async (type_id) => {
  
  return await FileModel.find({type_id});
};

export default {
  getAll,
  getAllLogged,
  add,
  update,
  Delete,
  getAllById,
  getAllTypeId
};
