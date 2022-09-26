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
    file: {
      data: Buffer,
      contentType: String
    },
    type_id: {
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
    uploaded_date: {
      type: Date
    },
    status_id: {
      type: Schema.Types.ObjectId,
      ref: 'Status',
      required: true
    },
    updated_at: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true
  }
);

// Plugins
schema.plugin(aggregatePaginate);
schema.plugin(AutoIncrement(mongoose), { id: 'file_seq', inc_field: 'id' });

// Indexes
schema.index({ id: 1 });

const Model = model('File', schema);

export default Model;
