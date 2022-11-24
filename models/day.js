import mongoose from 'mongoose'

const Schema = mongoose.Schema

const feelingsSchema = new Schema ({
  feelings: {
    type: String,
    required: true,
    enum: ['Tired', 'Relaxed', 'Stressed', 'Happy', 'Depressed']
  },
})

const daySchema = new Schema({
  snoozedAt: String,
  wokeUp: String,
  totalHours: {
    type: String,
    required: true,
  },
  beforeSleep: String,
  today: {
    type: String,
    required: true,
    enum: ['Working', 'Day Off', 'Stressed']
  },
  bodyCondition: String,
  feelings: [feelingsSchema]
},{
  timestamps: true,
})

const Profile = mongoose.model('Profile', daySchema)

export { Day }