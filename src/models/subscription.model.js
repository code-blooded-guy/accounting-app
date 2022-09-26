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
    name: {
      type: String,
      default: null
    },
    description: {
      type: String,
      default: null
    },
    duration: {
      type: Number,
      default: 12
    },
    price: {
      type: Number,
      default: 0
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
schema.plugin(AutoIncrement(mongoose), {
  id: 'subscription_seq',
  inc_field: 'id'
});

// Indexes
schema.index({ id: 1 });

const Model = model('Subscription', schema);

export default Model;
