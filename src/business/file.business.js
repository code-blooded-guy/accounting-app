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

export default {
  getAll,
  getAllLogged
};
