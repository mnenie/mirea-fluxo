import mongoose, { Schema } from 'mongoose'

const OrderSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  manager: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  content: {
    type: String,
    required: true,
  },
  dateEnd: {
    type: Date,
    required: true,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ['not verified', 'in process', 'closed'],
    required: true,
    default: 'not verified',
  },
  price: {
    type: Number,
    required: true,
  },
  organization: {
    type: String,
    default: '',
  },
  stages: {
    type: [{ type: Schema.Types.ObjectId, ref: 'Stage' }],
    required: true,
    default: [],
  },
  risks: {
    type: Schema.Types.Mixed,
    default: '',
  },

})

export default mongoose.model('Order', OrderSchema)
