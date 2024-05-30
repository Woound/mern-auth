const authRouter = require('express').Router()
const { signup, signin, google } = require('../controllers/auth.controller')

authRouter.post('/signup', signup)
authRouter.post('/signin', signin)
authRouter.post('/google', google)

module.exports = authRouter
