const mongoose = require('mongoose')

const Schema = mongoose.Schema

const tweetSchema = new Schema({
  _creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
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

