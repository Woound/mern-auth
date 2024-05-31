const usersRouter = require('express').Router()
const {
  test,
  updateUser,
  deleteUser,
} = require('../controllers/users.controller')
const verifyToken = require('../utils/verifyUser')

usersRouter.get('/', test)
usersRouter.post('/update/:id', verifyToken, updateUser)
usersRouter.delete('/delete/:id', verifyToken, deleteUser)

module.exports = usersRouter
