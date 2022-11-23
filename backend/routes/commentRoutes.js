const express = require('express')
const requireAuth = require('../middlewares/requireAuth')
const { getCommentsPerTweet, createComment, updateComment, deleteComment } = require('../controllers/commentController')

const router = express.Router()

router.use(requireAuth)

router.get('/:id/comments', getCommentsPerTweet)

router.post('/:id/comment', createComment)

router.patch('/comment/:id', updateComment)

router.delete('/comment/:id', deleteComment)

module.exports = router
