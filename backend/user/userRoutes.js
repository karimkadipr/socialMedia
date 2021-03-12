import express from 'express'
import {
  registerUser,
  loginUser,
  getConnectedUser,
  deleteAccount,
} from './userController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/register').post(registerUser)
router.route('/login').post(loginUser)
router.route('/profile').get(protect, getConnectedUser)
router.route('/deleteaccount').delete(protect, deleteAccount)

export default router
