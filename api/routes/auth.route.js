const authRouter = require('express').Router()
const { signup, signin } = require('../controllers/auth.controller')

authRouter.post('/signup', signup)
authRouter.post('/signin', signin)

module.exports = authRouter
