const authRouter = require('express').Router()
const {
  signup,
  signin,
  google,
  signout,
} = require('../controllers/auth.controller')

authRouter.post('/signup', signup)
authRouter.post('/signin', signin)
authRouter.post('/google', google)
authRouter.get('/signout', signout)

module.exports = authRouter
