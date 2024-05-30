const usersRouter = require('express').Router()
const { test, updateUser } = require('../controllers/users.controller')
const verifyToken = require('../utils/verifyUser')

usersRouter.get('/', test)
usersRouter.post('/update/:id', verifyToken, updateUser)

module.exports = usersRouter
