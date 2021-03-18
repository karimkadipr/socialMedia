import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import User from '../user/userModel.js'

const protect = asyncHandler(async (req, res, next) => {
  let token
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1]
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      req.user = decoded.id
      next()
    } catch (error) {
      throw new Error(error)
    }
  } else {
    res.status(404)
    throw new Error('No token sent')
  }
})

const isAdmin = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user)
  if (user && user.isAdmin === true) {
    next()
  } else {
    res.status(401)
    throw new Error('Not authorized as an admin')
  }
})

export { protect, isAdmin }
