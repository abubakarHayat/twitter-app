const express = require('express')
const requireAuth = require('../middlewares/requireAuth')
const { loginUser, signupUser, getUserProfile, updateUserProfile } = require('../controllers/userController')

const router = express.Router()

router.post('/login', loginUser)

router.post('/signup', signupUser)

router.use(requireAuth)

router.get('/:id', getUserProfile)

router.patch('/:id', updateUserProfile)

module.exports = router
