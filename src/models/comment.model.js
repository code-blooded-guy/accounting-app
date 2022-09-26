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
    message: {
      type: String,
      required: true
    },
    file: {
      data: Buffer,
      contentType: String
    },
    file_id: {
      type: Schema.Types.ObjectId,
      ref: 'Type',
      required: true
    },
    user_id: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    accountant_id: {
      type: Schema.Types.ObjectId,
      ref: 'Accountant',
      required: true
    },
    time: {
      type: Date,
      default: Date.now
    },
    to: {
      type: String,
      required: true
    },
    from: {
      type: String,
      required: true
    },
    seen: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

// Plugins
schema.plugin(aggregatePaginate);
schema.plugin(AutoIncrement(mongoose), { id: 'comment_seq', inc_field: 'id' });

// Indexes
schema.index({ id: 1 });

const Model = model('Comment', schema);

export default Model;
