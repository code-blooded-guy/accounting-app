import CommentModel from '@/models/comment.model';

const Add = async (body) => {
    // Database query
    return await CommentModel.create(body);
};

const getAll = async (file_id) => {
    // Database query
    return await CommentModel.find({file_id});
};

export default {Add ,getAll}