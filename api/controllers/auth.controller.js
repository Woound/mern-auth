const User = require('../models/user.model')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const errorHandler = require('../utils/error')

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

const signin = async (req, res, next) => {
  const { email, password } = req.body
  try {
    const validUser = await User.findOne({ email })
    if (!validUser) return next(errorHandler(404, 'User not found'))

    const validPassword = bcryptjs.compareSync(password, validUser.password)
    if (!validPassword) return next(errorHandler(401, 'Invalid credentials'))

    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET)
    const { password: hashedPassword, ...userWithoutPassword } = validUser._doc

    const cookieExpiryDate = new Date(Date.now() + 3600000) // 1 hour
    res
      .cookie('access_token', token, {
        httpOnly: true,
        expires: cookieExpiryDate,
      })
      .status(200)
      .json(userWithoutPassword)
  } catch (error) {
    next(error)
  }
}

const google = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email })
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
      const { password: hashedPassword, ...userWithoutPassword } = user._doc
      const cookieExpiryDate = new Date(Date.now() + 3600000) // 1 hour

      res
        .cookie('access_token', token, {
          httpOnly: true,
          expires: cookieExpiryDate,
        })
        .status(200)
        .json(userWithoutPassword)
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8)
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10)
      const newUser = new User({
        username:
          req.body.name.split(' ').join('').toLowerCase() +
          Math.random().toString(36).slice(-8),
        email: req.body.email,
        password: hashedPassword,
        profilePicture: req.body.photo,
      })
      await newUser.save()
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET)
      const { password: hashedPassword2, ...userWithoutPassword } = newUser._doc
      const cookieExpiryDate = new Date(Date.now() + 3600000) // 1 hour
      res
        .cookie('access_token', token, {
          httpOnly: true,
          expires: cookieExpiryDate,
        })
        .status(200)
        .json(userWithoutPassword)
    }
  } catch (error) {
    next(error)
  }
}

module.exports = { signup, signin, google }
