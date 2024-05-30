const express = require('express')
const mongoose = require('mongoose')
const app = express()
const dotenv = require('dotenv')
dotenv.config()
const usersRouter = require('./routes/users.route')
const authRouter = require('./routes/auth.route')
const cookieParser = require('cookie-parser')

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB')
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB', error)
  })

app.listen(3000, () => {
  console.log('Server running on port 3000')
})

app.use(express.json())
app.use(cookieParser())

app.use('/api/users', usersRouter)
app.use('/api/auth', authRouter)

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500
  const message = err.message || 'Internal Server Error'
  return res.status(statusCode).json({
    success: false,
    error: message,
    statusCode,
  })
})
