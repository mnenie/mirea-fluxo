import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  passwordHash: {
    type: String,
  },
  photoUrl: {
    type: String,
  },
}, {
  timestamps: true,
})

export default mongoose.model('User', UserSchema)
