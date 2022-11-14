const jwt = require('jsonwebtoken')
const User = require('../models/User')

const requireAuth = async (req, res, next) => {

  try{
    const { authorization: token } = req.headers
    if (!token) {
      return res.status(401).json({error: 'Not authorized'})
    }
    const {_id} = jwt.verify(token, process.env.JWT_SECRET)

    req.user = await User.findOne({ _id }).select('_id')
    next()
  }catch (error){
    console.log(error)
    return res.status(401).json({error: 'Request is not authorized'})
  }

}

module.exports = requireAuth
