const express = require('express')
const requireAuth = require('../middlewares/requireAuth')
const { getTweet, getTweets, createTweet, deleteTweet, updateTweet, likeTweet, unlikeTweet, getTweetsByUser } = require('../controllers/tweetController')

const router = express.Router()

router.use(requireAuth)

router.get('/like/:id', likeTweet)

router.get('/unlike/:id', unlikeTweet)

router.get('/', getTweets)

router.post('/', createTweet)

router.get('/user/:id', getTweetsByUser)

router.get('/:id', getTweet)

router.patch('/:id', updateTweet)

router.delete('/:id', deleteTweet)

module.exports = router
