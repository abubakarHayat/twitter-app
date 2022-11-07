const User = require('../models/User')
const jwt = require('jsonwebtoken')

const createToken = (_id) => {
  return jwt.sign({_id}, process.env.JWT_SECRET, { expiresIn: '3d' })
}

const loginUser = async (req, res) => {
  res.json({msg: 'login'})
}


const signupUser = async (req, res) => {
  const { email, password, firstName, lastName, dob } = req.body

  try{
    const user = await User.signup(email, password, firstName, lastName, dob)
    const token = createToken(user._id)

    res.status(200).json({email, token})

  }catch(error){
    res.status(400).json({error: error.message})
  }
}

module.exports = { loginUser, signupUser }
