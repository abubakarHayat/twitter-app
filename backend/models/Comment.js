const mongoose = require('mongoose')

const Schema = mongoose.Schema

const commentSchema = new Schema({
  _commenter: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  tweetId: {
    type: Schema.Types.ObjectId,
    ref: 'Tweet',
    required: true
  },
  body: {
    type: String,
    required: true
  }
}, { timestamps: true })

module.exports = mongoose.model('Comment', commentSchema)

