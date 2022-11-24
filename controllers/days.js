import { Profile } from '../models/profile.js'
import { Day } from '../models/day.js'

const create = async (req, res) => {
  try {
    req.body.profile = req.user.profile
    const day = await Day.create(req.body)
    // creates new Day entry based on the data inputted by user in req.body
    const profile = await Profile.findByIdAndUpdate (
      req.user.profile,
      { $push: {days: day}},
      { new: true}
    )
    day.profile = profile
    res.status(201).json(day)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

const index = async (req, res) => {
  try {
    const days = await Day.find({})
    .populate('profile')
    .sort({ createdAt: 'desc' })
    res.status(200).json(days)
  } catch (error) {
    res.status(500).json(error)
  }
}

const show = async (req, res) => {
  try {
    const day = await Day.findById(req.params.id)
    .populate('profile')
    res.status(200).json(day)
  } catch (error) {
    res.status(500).json(error)
  }
}


export {
  create,
  index,
  show
}