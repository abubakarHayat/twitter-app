const User = require('../models/User')
const jwt = require('jsonwebtoken')
const { mongoose } = require('mongoose')
const cloudinary = require('../utils/cloudinary')
const path = require('path')
const fs = require('fs')


const createToken = (_id) => {
  return jwt.sign({_id}, process.env.JWT_SECRET, { expiresIn: '3d' })
}

const loginUser = async (req, res) => {
  const {email, password} = req.body

  try{
    const user = await User.login(email, password)
    const token = createToken(user._id)

    res.status(200).json({email, _id: user._id, token, image: user.image.url})

  }catch(error){
    res.status(400).json({error: error.message})
  }

}


const signupUser = async (req, res) => {
  const { email, password, firstName, lastName, dob, image } = req.body

  try{
    let uploadResult = {
      publicId: null,
      url: null
    }
    if (image){
      uploadResult = await cloudinary.uploader.upload(image, {
        folder: 'users'
      })
    }else{
      return res.status(422).json({error: "Profile image is required"})
    }
    const user = await User.signup(firstName, lastName, email, password, dob, uploadResult)
    const token = createToken(user._id)

    res.status(200).json({email, _id: user._id, token, image: user.image.url})

  }catch(error){
    res.status(400).json({error: error.message})
  }
}

const getUserProfile = async (req, res) => {
  const _id = req.params.id

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).json({error: "Not a valid user ID"})
  }
  const user = await User.findById({_id})

  if (!user){
    res.status(404).json({error: "No such user exist"})
  }else{
    res.status(200).json({
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      dob: user.dob,
      image: user.image})
  }
}
const updateUserProfile = async (req, res) => {
  const _id = req.params.id
  if(req.user._id != _id){
    return res.status(400).json({error: "Access denied"})
  }
  const { email, password, firstName, lastName, dob, image } = req.body
  let uploadResult = {
    publicId: null,
    url: null
  }
  if (image){
    uploadResult = await cloudinary.uploader.upload(image, {
      folder: 'users'
    })
  }

  try{
    const result = await User.validateAndUpdateUser(_id, firstName, lastName, email, password, dob, uploadResult)
    res.status(200).json(result)
  }catch (error){
    res.status(404).json({error: error.message})
  }

}

module.exports = { loginUser, signupUser, getUserProfile, updateUserProfile }
