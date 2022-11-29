require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const path = require('path')

const userRoutes = require('./routes/userRoutes')
const tweetRoutes = require('./routes/tweetRoutes')
const commentRoutes = require('./routes/commentRoutes')

const app = express()
app.use(cors())

app.use(express.json({ limit: '2mb', extended: true}))
app.use(express.urlencoded({limit: "2mb", extended: true, parameterLimit: 50000}))
app.use(express.static(path.join(__dirname, 'public')))
app.get('/', (req, res) => {
  res.json({msg: 'Welcome to twitter!'})
})

app.use('/tweets', tweetRoutes)

app.use('/tweet', commentRoutes)

app.use(userRoutes)


mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log('Listening for requests!')
    })
  })
  .catch((err) => {
    console.log('Couldn\'t connect to DB: ', err)
  })

