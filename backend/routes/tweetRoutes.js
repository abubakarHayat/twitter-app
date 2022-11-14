const express = require('express')
const requireAuth = require('../middlewares/requireAuth')
const { getTweet, getTweets, createTweet, deleteTweet, updateTweet } = require('../controllers/tweetController')

const router = express.Router()

router.use(requireAuth)

router.get('/', getTweets)

router.post('/', createTweet)

router.get('/:id', getTweet)

router.patch('/:id', updateTweet)

router.delete('/:id', deleteTweet)

module.exports = router
