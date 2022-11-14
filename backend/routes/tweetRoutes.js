const express = require('express')
const requireAuth = require('../middlewares/requireAuth')
const { getTweet, getTweets, createTweet, deleteTweet, updateTweet } = require('../controllers/tweetController')

const router = express.Router()

router.post('/tweet', createTweet)


module.exports = router
