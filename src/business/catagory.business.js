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

export default {
  getAll,
  getAllLogged,
  add
};
