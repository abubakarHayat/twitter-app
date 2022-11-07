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
  }

}, { timestamps: true })

userSchema.statics.signup = async function (email, password) {

  if( !email || !password) {
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

  const user = await this.create( {email, encryptedPassword} )

  return user
}

module.exports = mongoose.model('User', userSchema)
