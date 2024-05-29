const usersRouter = require('express').Router()
const test = require('../controllers/users.controller')

usersRouter.get('/', test)

module.exports = usersRouter
