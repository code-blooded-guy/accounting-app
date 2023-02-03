import mongoose, { Schema, model } from 'mongoose';
import aggregatePaginate from 'mongoose-aggregate-paginate-v2';
import AutoIncrement from 'mongoose-sequence';
// Schema
const schema = new Schema(
  {
    id: {
      type: Number,
      default: null
    },
    users: Array,
    // users:[{id:'asdfasd',type:"user"},{id:'asdfasf',type:"accountant"}]
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Plugins
schema.plugin(aggregatePaginate);
schema.plugin(AutoIncrement(mongoose), { id: 'message_seq', inc_field: 'id' });

// Indexes
schema.index({ id: 1 });

const Model = model('message', schema);

export default Model;
