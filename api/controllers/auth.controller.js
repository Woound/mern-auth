const User = require('../models/user.model')
const bcryptjs = require('bcryptjs')

const signup = async (req, res, next) => {
  const { username, email, password } = req.body
  const saltRounds = 10
  const hashedPassword = bcryptjs.hashSync(password, saltRounds)

  const newUser = new User({ username, email, password: hashedPassword })
  try {
    await newUser.save()
    res.status(201).json({ message: 'User created succesfully' })
  } catch (error) {
    next(error)
  }
}

module.exports = signup
