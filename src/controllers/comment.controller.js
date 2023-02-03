import CommentBusiness from '@/business/comment.business';
import { success, error } from '@/utils/helper.util';

const getAll = async (req, res) => {
  try {
    // Business logic
   
    const data = await CommentBusiness.getAll(req.params.fileId);
    // Return success
    success(res, data);
  } catch (err) {
    // Return error (if any)
    error(res, err);
  }
};

const addComment = async (req, res) => {
  try {
    console.log(req.body)
    const data = await CommentBusiness.Add(req.body);
    let created = '_id' in data || 'n' in data;
    return success(res, 201, { created });
  } catch (err) {
    if (err.code === 11000) {
      let err = 'Duplicate input';
      error(res, err);
    } else {
      error(res, err);
    }
  }
};

  export default {getAll ,addComment}