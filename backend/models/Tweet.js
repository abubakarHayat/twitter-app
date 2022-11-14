const mongoose = require('mongoose')
const validator = require('validator')

const Schema = mongoose.Schema

const tweetSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  body: {
    type: String,
    required: true
  },
  likesCount: {
    type: Number,
    required: true
  }
}, { timestamps: true })

module.exports = mongoose.model('Tweet', tweetSchema)

