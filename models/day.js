import mongoose from 'mongoose'

const Schema = mongoose.Schema

const feelingsSchema = new Schema ({
  feelings: {
    type: String,
    required: true,
    enum: ['Tired', 'Relaxed', 'Stressed', 'Happy', 'Depressed']
  },
  profile: { type: Schema.Types.ObjectId, ref: 'Profile' },
})

const daySchema = new Schema({
  date: {
    type: Date,
    default: function () {
      return new Date().setFullYear(new Date().getFullYear())
    },
    required: true
  },
  snoozedAt: String,
  wokeUp: String,
  totalHours: {
    type: String,
    required: true,
  },
  beforeSleep: {
    type: String,
    required: true,
    enum: ['caffeine', 'alcohol', 'ate late', 'smoking', 'nap', 'screen time', 'worked out', 'n/a']
  },
  today: {
    type: String,
    required: true,
    enum: ['worked', 'chilled']
  },
  bodyCondition: {
    type: String,
    required: true,
    enum: ['feeling alright', 'blocked nose', 'headache', 'period', 'pain']
  },
  feelings: [feelingsSchema],
  profile: { type: Schema.Types.ObjectId, ref: 'Profile' },
},{
  timestamps: true,
})

const Day = mongoose.model('Day', daySchema)

export { Day }
