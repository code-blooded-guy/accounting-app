// Models
import FileModel from '@/models/file.model';
import { ObjectId } from 'mongodb';

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
 let a = await FileModel.aggregate([
  {
    $match : {_id:ObjectId(_id)},
    
  },
    { $lookup:
        {
           from: "status",
           localField: "status_id",
           foreignField: "_id",
           as: "status"
        }
    },
]);

  // console.log('a______',a[0].status)
  return a;
  // return await FileModel.findOne({ _id});
};

const getAllTypeId = async (type_id) => {
  
  return await FileModel.find({type_id});
};

const getAllCompanyId = async (type_id,company_id) => {
  
  return await FileModel.find({type_id,company_id});
};

export default {
  getAll,
  getAllLogged,
  add,
  update,
  Delete,
  getAllById,
  getAllTypeId,
  getAllCompanyId
};
