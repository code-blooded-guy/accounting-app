// Models
import SubscriptionModal from '@/models/subscription.model';

const getAll = async () => {
  // Database query
  return await SubscriptionModal.find({});
};

const getAllLogged = async (user_id) => {
  // Database query
  return await SubscriptionModal.find({ user_id });
};

export default {
  getAll,
  getAllLogged
};
