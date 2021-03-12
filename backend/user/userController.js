import asyncHandler from 'express-async-handler'
import User from './userModel.js'
import generateToken from '../utils/generateToken.js'

const registerUser = asyncHandler(async (req, res) => {
  const { pseudo, name, email, password } = req.body

  const user = await User.findOne({ email })

  if (!user) {
    const newUser = new User({ pseudo, name, email, password })

    await newUser.save()
    res.json({
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      pseudo: newUser.pseudo,
      token: generateToken(newUser._id),
    })
  } else {
    throw new Error('User already exist')
  }
})

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })

  if (user && (await user.matchPassword(password))) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      pseudo: user.pseudo,
      token: generateToken(user._id),
    })
  } else {
    res.status(404)
    throw new Error('User Not found')
  }
})

const getConnectedUser = asyncHandler(async (req, res) => {
  const userId = req.user

  const user = await User.findOne({ _id: userId }).select('-password')
  if (user) {
    res.status(200).json(user)
  } else {
    res.status(404)
    throw new Error('User does not exist')
  }
})

const deleteAccount = asyncHandler(async (req, res) => {
  const userId = req.user
  console.log(userId)
  const user = await User.findOne({ _id: userId })
  if (user) {
    await user.remove()
    res.json('user has been deleted')
  } else {
    res.status(404)
    throw new Error('user does not exist')
  }
})

export { registerUser, loginUser, getConnectedUser, deleteAccount }
