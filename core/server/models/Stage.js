import mongoose, { Schema } from 'mongoose'

const StageSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
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
  price: {
    type: Number,
    required: true,
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
  organization: {
    type: String,
    default: '',
  },
  status: {
    type: String,
    default: 'Работа не начата',
  },

})

export default mongoose.model('Stage', StageSchema)
