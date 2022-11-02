const express = require('express')

const router = express.Router()

router.get('/login', (req, res) => {
  res.json({msg: 'login'})
})

router.get('/signup', (req, res) => {
  res.json({msg: 'signup'})
})

module.exports = router
