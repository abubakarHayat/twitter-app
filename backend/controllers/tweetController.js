const e = require('express')
const mongoose = require('mongoose')
const Tweet = require('../models/Tweet')

const getTweets = async (req, res) => {
  const _creator = req.user._id

  Tweet.find({ _creator })
  .then((result) => {
    res.status(200).json({ result })
  })
  .catch((error) => {
    res.status(400).json({ error: error.message })
  })
}

const getTweet = async (req, res) => {
  const _id = req.params.id

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).json({error: "Not a valid ID"})
  }

  const tweet = await Tweet.findById({_id})

  if (!tweet){
    res.status(404).json({error: "No such tweet exist"})
  }else{
    res.status(200).json({tweet})
  }
}

const createTweet = async (req, res) => {
  let { body, likes: likesCount } = req.body
  const _creator =  req.user._id

  try {

    if (!body){
      throw Error('Tweet body cannot be blank')
    }
    likesCount = null ?? 0
    const tweet = await Tweet.create({ body, likesCount, _creator })
    res.status(200).json({ tweet })

  }catch(error){
    return res.status(400).json({ error: error.message })
  }
}

const deleteTweet = async (req, res) => {
  const _id = req.params.id

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).json({error: "Not a valid ID"})
  }

  Tweet.deleteOne({_id})
  .then((result) => {
    res.status(200).json(result)
  })
  .catch((error) => {
    res.status(400).json({ error })
  })


}

const updateTweet = async (req, res) => {
  const { body, likes: likesCount } = req.body
  const _id = req.params.id

  if(!body){
    return res.status(400).json({ error: "Tweet body cannot be blank" })
  }
  Tweet.findByIdAndUpdate(_id, {body, likesCount}, (err, doc) => {
    if (err){
     res.status(422).json({ error: "Tweet cannot be updated" })
    }else{
      res.status(200).json({ doc })
    }
  })
}

module.exports = { getTweet, getTweets, createTweet, deleteTweet, updateTweet }
