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
    color: {
      type: String,
      default: null
    },
    icon: {
      type: String,
      // contentType: String
    },
    isActive: {
      type: Boolean,
      default: true
    }
  },  
  {
    timestamps: true
  }
);

// Plugins
schema.plugin(aggregatePaginate);
schema.plugin(AutoIncrement(mongoose), {
  id: 'type_seq',
  inc_field: 'id'
});

// Indexes
schema.index({ id: 1 });

const Model = model('Type', schema);

export default Model;
