const User = require('../models/user.model')
const errorHandler = require('../utils/error')
const bcryptjs = require('bcryptjs')

const test = (req, res, next) => {
  res.json({
    message: 'API is working',
  })
}

// Update user
const updateUser = async (req, res, next) => {
  if (req.user.id != req.params.id) {
    return next(errorHandler(401, 'You can only update your account.'))
  }
  try {
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10)
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          profilePicture: req.body.profilePicture,
        },
      },
      { new: true }
    )
    const { password, ...userWithoutPassword } = updatedUser._doc
    res.status(200).json(userWithoutPassword)
  } catch (error) {
    next(error)
  }
}

const deleteUser = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return next(errorHandler(401, 'You can only delete your own account.'))
  }
  try {
    await User.findByIdAndDelete(req.params.id)
    res.status(200).json('User has been deleted...')
  } catch (error) {
    next(error)
  }
}

module.exports = { test, updateUser, deleteUser }
