const express = require('express')
const mongoose = require('mongoose')
const app = express()
const dotenv = require('dotenv')
dotenv.config()

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Conntected to MongoDB')
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB', error)
  })

app.listen(3000, () => {
  console.log('Server running on port 3000')
})
