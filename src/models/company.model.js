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
    company_name: {
      type: String,
      default: null
    },
    company_logo: {
      type: String,
      // contentType: String
    },
    catagory_id: {
      type: Schema.Types.ObjectId,
      ref: 'Catagory',
      required: true
    },
    user_id: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    accountant_id: {
      type: Schema.Types.ObjectId,
      ref: 'Accountant'
    },
    country_id: {
      type: String,
      ref: 'Country',
      default: 'India'
    },
    accountant_status: {
      type: String,
      default: 'Not selected'
    },
    created_at: {
      type: Date
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
schema.plugin(AutoIncrement(mongoose), { id: 'company_seq', inc_field: 'id' });

// Indexes
schema.index({ id: 1 });

const Model = model('Company', schema);

export default Model;
