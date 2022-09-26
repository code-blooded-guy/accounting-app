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

export default {
  getAll,
  getAllLogged
};
