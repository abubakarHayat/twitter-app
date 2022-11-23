const mongoose = require('mongoose')
const Comment = require('../models/Comment')

const getCommentsPerTweet = async (req, res) => {
  const id = req.params.id

  Comment.find({tweetId: id}).sort({createdAt: -1}).populate('_commenter', 'firstName image')
  .then((result) => {
    res.status(200).json(result)
  })
  .catch((error) => {
    res.status(400).json({ error: error.message })
  })
}

const createComment = async (req, res) => {
  const tweetId = req.params.id
  const { body } = req.body
  const _commenter =  req.user._id

    if (!body){
      throw Error('Comment body cannot be blank')
    }
  try {
    const comment = await Comment.create({
      body,
      _commenter,
      tweetId
      })
    const result = await comment.populate('_commenter', 'firstName image')

    res.status(200).json(result)
  } catch (error){
    res.status(422).json({ error: error.message })
  }

}

const deleteComment = async (req, res) => {
  const _id = req.params.id

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).json({error: "Not a valid ID"})
  }

  Tweet.findOneAndDelete({_id})
  .then((result) => {
    res.status(200).json(result)
  })
  .catch((error) => {
    res.status(400).json({ error: error.message })
  })

}

const updateComment = async (req, res) => {
  const { body } = req.body
  const _id = req.params.id

  if(!body){
    return res.status(400).json({ error: "Comment body cannot be blank" })
  }
  Comment.findByIdAndUpdate(_id, {body}, {new: true })
  .populate('_commenter', 'firstName image')
  .then((doc) => {
      res.status(200).json(doc)
  })
  .catch((error) => {
    res.status(422).json({ error })
  })
}


module.exports = { getCommentsPerTweet, createComment, updateComment, deleteComment }
