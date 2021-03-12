import express from 'express'
import {
  getMyProfile,
  createProfile,
  updateProfile,
  getProfileById,
  deleteProfile,
  followAProfile,
  unFollowAProfile,
  getAllProfiles,
  checkFollow,
} from './profileController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router
  .route('/')
  .get(protect, getMyProfile)
  .post(protect, createProfile)
  .put(protect, updateProfile)
  .delete(protect, deleteProfile)
router.route('/all').get(protect, getAllProfiles)
router.route('/follow/:id').post(protect, followAProfile)
router.route('/unfollow/:id').post(protect, unFollowAProfile)
router.route('/isfollowed/:id').get(protect, checkFollow)
router.route('/:id').get(protect, getProfileById)

export default router
