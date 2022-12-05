const mongoose = require('mongoose')
const cloudinary = require('../utils/cloudinary')
const Tweet = require('../models/Tweet')
const Comment = require('../models/Comment')

const getTweets = async (req, res) => {

  Tweet.find({}).sort({createdAt: -1}).populate('_creator', '_id firstName image')
  .then((result) => {
    res.status(200).json(result)
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

  Tweet.findById({_id})
  .populate('_creator', '_id firstName image')
  .then((result) => {
    res.status(200).json(result)
  })
  .catch((error) => {
    res.status(422).json({error: error.message})
  })

}

const getTweetsByUser = async (req, res) => {
  const id = req.params.id

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: "Not a valid ID"})
  }

  Tweet.find({_creator: id})
  .populate('_creator', '_id firstName image')
  .then((result) => {
    res.status(200).json(result)
  })
  .catch((error) => {
    res.status(422).json({error: error.message})
  })

}

const createTweet = async (req, res) => {
  let { body, likes: likesCount, image } = req.body
  const _creator =  req.user._id


  try {
    if (!body){
      throw Error('Tweet body cannot be blank')
    }
    likesCount = null ?? 0

    let uploadResult = {
      public_id: null,
      secure_url: null
    }
    if (image){
      uploadResult = await cloudinary.uploader.upload(image, {
        folder: 'tweets'
      })
    }

    const tweet = await Tweet.create({
      body,
      likesCount,
      _creator,
      image: {
        publicId: uploadResult.public_id,
        url: uploadResult.secure_url
       }
      })
    const result = await tweet.populate('_creator', 'firstName image')

    res.status(200).json(result)
  } catch (error){
    res.status(422).json({ error: error.message })
  }

}

const deleteTweet = async (req, res) => {
  const _id = req.params.id

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).json({error: "Not a valid ID"})
  }
  try{
    const tweet = await Tweet.findById(_id)
    if (!tweet._creator.equals(req.user._id)){
      return res.status(401).json({ error: 'Request not authorized'})
    }
    if (tweet.image.publicId){
    const { publicId } = tweet.image
    await cloudinary.uploader.destroy(publicId);
    }
  }catch(error){
    res.status(422).json({error: error.message})
  }

  Comment.deleteMany({tweetId: _id})
  .then((result) => {
    console.log(result)
  })
  .catch((error) => {
    console.log(error)
  })
  Tweet.findOneAndDelete({_id})
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
  Tweet.findByIdAndUpdate(_id, {body, likesCount}, {new: true })
  .populate('_creator', 'firstName image')
  .then((doc) => {
      res.status(200).json(doc)
  })
  .catch((error) => {
    res.status(422).json({ error: error.message })
  })
}

const likeTweet = async (req, res) => {
  const tweetId = req.params.id
  const _id = req.user._id
  try{
    const checkTweet = await Tweet.findById(tweetId)
    if (checkTweet.likedBy?.includes(_id)){
      return res.status(422).json({error: "Tweet already liked"})
    }
  }catch (error){
    return res.status(422).json({error: error.message})
  }

  Tweet.findByIdAndUpdate(tweetId, {$push: {likedBy: _id}, $inc: {likesCount: 1}}, {new: true})
  .populate('_creator', 'firstName image')
  .then((doc) => {
    res.status(200).json(doc)
  })
  .catch((error) => {
    res.status(422).json({error: error.message})
  })


}
const unlikeTweet = async (req, res) => {
  const tweetId = req.params.id
  const _id = req.user._id

  try{
    const checkTweet = await Tweet.findById(tweetId)
    if (!checkTweet.likedBy.includes(_id)){
      return res.status(422).json({error: "Tweet already not liked"})
    }
  }catch (error){
    return res.status(422).json({error: error.message})
  }
  Tweet.findByIdAndUpdate(tweetId, {$pull: {likedBy: _id}, $inc: {likesCount: -1}}, {new: true})
  .populate('_creator', 'firstName image')
  .then((doc) => {
    res.status(200).json(doc)
  })
  .catch((error) => {
    res.status(422).json({error: error.message})
  })

}

module.exports = { getTweet, getTweets, createTweet, deleteTweet, updateTweet, likeTweet, unlikeTweet, getTweetsByUser }
