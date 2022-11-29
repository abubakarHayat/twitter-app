const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  encryptedPassword: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  dob: {
    type: Date,
    required: true
  },
  image:{
    publicId: {
      type: String,
      required: true
    },
    url: {
      type: String,
      required: true
    }
  }

}, { timestamps: true })

userSchema.statics.signup = async function (firstName, lastName, email, password, dob, uploadResult) {

  if( !email || !password || !firstName || !lastName || !dob) {
    throw Error("All fields must be filled")
  }
  if(!validator.isEmail(email)){
    throw Error("Email is not valid")
  }
  if(!validator.isStrongPassword(password)){
    throw Error('Password is not strong enough')
  }

  const exists = await this.findOne({ email })
  if (exists) {
    throw Error('Email already in use!')
  }
  const salt = await bcrypt.genSalt(10)
  const encryptedPassword = await bcrypt.hash(password, salt)

  image = {
    publicId: uploadResult.public_id,
    url: uploadResult.secure_url
  }

  const user = await this.create( {firstName, lastName, email, encryptedPassword, dob, image} )

  return user
}

userSchema.statics.login =  async function(email, password) {
  if (!email || !password) {
    throw Error("All fields must be filled")
  }

  const user = await this.findOne({email})

  if (!user){
    throw Error("Incorrect email")
  }

  const match = await bcrypt.compare(password, user.encryptedPassword)

  if (!match){
    throw Error("Invalid login credentials")
  }

  return user
}

userSchema.statics.validateAndUpdateUser = async function (_id, firstName, lastName, email, password, dob, uploadResult){

  if( !email && !password && !firstName && !lastName && !dob && !uploadResult) {
    throw Error("Empty fields, cannot update!")
  }
  let updationObj = {}
  let updationMsg = {}
  if(email) {
    if( !validator.isEmail(email)){
      throw Error('Email format is not valid')
    }
    const exists = await this.findOne({ email })
    if (exists) {
      throw Error('Email already in use!')
    }else{
      updationObj.email = email
      updationMsg.email = email
    }
  }
  if(password){
    if(!validator.isStrongPassword(password)){
      throw Error('Password is not strong enough')
    }
    const salt = await bcrypt.genSalt(10)
    const encryptedPassword = await bcrypt.hash(password, salt)
    updationObj.encryptedPassword = encryptedPassword
    updationMsg.password = "Password updated"

  }
  if(firstName){
    updationObj.firstName = firstName
    updationMsg.firstName = "First Name updated"
  }
  if(lastName){
    updationObj.lastName
    updationMsg.lastName = "Last Name updated"
  }
  if(dob){
    updationObj.dob = dob
    updationMsg.dob = "DOB updated"
  }
  updationObj.image = {
    publicId: uploadResult.public_id,
    url: uploadResult.secure_url
  }

  try {
    const res = await this.findOneAndUpdate({_id}, updationObj, {new: true})
    res.encryptedPassword = null
    return res
  }catch (error){
    throw Error(error.message)
  }

}

module.exports = mongoose.model('User', userSchema)
