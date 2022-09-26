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

export default {
  getAll,
  getAllLogged
};
