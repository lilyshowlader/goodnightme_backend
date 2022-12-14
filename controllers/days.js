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

const update = async (req, res) => {
  try {
    const day = await Day.findByIdAndUpdate(
      req.params.id,
      // the first argument is the _id of the document we wish to update
      req.body,
      // the second argument is the data used to updata the existing document
      { new: true }
      // the third argument specifies we want this method to return the updated document
    ). populate('profile')
    res.status(200).json(day)
  } catch (error) {
    res.status(500).json(error)
  }
}


const deleteDay = async (req, res) => {
  try {
    const day = await Day.findByIdAndDelete(req.params.id)
    const profile = await Profile.findById(req.user.profile)
    profile.days.remove({ _id: req.params.id })
    await profile.save()
    res.status(200).json(day)
  } catch (error) {
    res.status(500).json(error)
  }
}

const createFeeling = async (req, res) => {
  try {
    req.body.profile = req.user.profile
    const day = await Day.findById(req.params.id)
    day.feelings.push(req.body)
    await day.save()

    // find the newly created feeling:
    const newFeeling = day.feelings[day.comments.length - 1]

    // temporarily append profile object to newFeeling.profile
    const profile = await Profile.findById(req.user.profile)
    newFeeling.profile = profile

    // respond with the newFeeling
    res.status(201).json(newFeeling)
  } catch (error) {
    res.status(500).json(error)
  }
}

export {
  create,
  index,
  show, 
  update,
  deleteDay as delete,
  createFeeling,
}