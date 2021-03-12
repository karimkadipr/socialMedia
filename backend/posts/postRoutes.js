import express from 'express'
import { protect } from '../middleware/authMiddleware.js'
import {
  addNewPost,
  getMyPosts,
  deletePostById,
  likeAPost,
  deletePostLike,
  addAComment,
  deleteAComment,
  getAnyPost,
  getComments,
  getPostsByProfile,
  getSubsPosts,
  checkPostLike,
} from './postController.js'

const router = express.Router()

router.route('/').post(protect, addNewPost).get(protect, getMyPosts)
router.route('/all/:id').get(protect, getPostsByProfile)
router.route('/subsposts').get(protect, getSubsPosts)
router
  .route('/like/:id')
  .post(protect, likeAPost)
  .delete(protect, deletePostLike)
router.route('/checklike/:id').get(protect, checkPostLike)
router.route('/comment/:postId/:commentId').delete(protect, deleteAComment)
router
  .route('/comment/:id')
  .post(protect, addAComment)
  .get(protect, getComments)

router.route('/:pseudo/:postId').get(protect, getAnyPost)

router.route('/:id').delete(protect, deletePostById)

export default router
