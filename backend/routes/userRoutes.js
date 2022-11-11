const express = require('express')
const requireAuth = require('../middlewares/requireAuth')
const { loginUser, signupUser } = require('../controllers/userController')

const router = express.Router()

router.post('/login', loginUser)

router.post('/signup', signupUser)

router.use(requireAuth)

router.get('/profile', (req, res) => {
  res.json({msg: "profile"})
})

module.exports = router
