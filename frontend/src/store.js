import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import { userLoginReducer, userRegisterReducer } from './user/userReducer'
import {
  createProfileReducer,
  getMyProfileReducer,
  getAllProfilesReducer,
  getProfileByIdReducer,
  followProfileReducer,
  unFollowProfileReducer,
  updateProfileReducer,
  isFollowProfileReducer,
} from './profile/profileReducer'
import {
  getMyPostsReducer,
  deletePostReducer,
  likePostReducer,
  commentPostReducer,
  deleteLikePostReducer,
  addPostReducer,
  getAnyPostReducer,
  getCommentsPostReducer,
  getPostsByProfileReducer,
  getPostsForHomePageReducer,
  isLikedPostReducer,
  deleteCommentReducer,
} from './post/postReducer'

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  createProfile: createProfileReducer,
  getMyProfile: getMyProfileReducer,
  getAllProfiles: getAllProfilesReducer,
  getProfileById: getProfileByIdReducer,
  isFollowProfile: isFollowProfileReducer,
  followProfile: followProfileReducer,
  unFollowProfile: unFollowProfileReducer,
  getMyPosts: getMyPostsReducer,
  deletePost: deletePostReducer,
  likePost: likePostReducer,
  commentPost: commentPostReducer,
  deleteLikePost: deleteLikePostReducer,
  addPost: addPostReducer,
  getAnyPost: getAnyPostReducer,
  getCommentsPost: getCommentsPostReducer,
  getPostsByProfile: getPostsByProfileReducer,
  getPostsForHomePage: getPostsForHomePageReducer,
  isLikedPost: isLikedPostReducer,
  deleteComment: deleteCommentReducer,
  updateProfile: updateProfileReducer,
})

const userLoginFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null

const commentFromStorage = localStorage.getItem('userComments')
  ? JSON.parse(localStorage.getItem('userComments'))
  : []

const initialState = {
  userLogin: {
    userInfo: userLoginFromStorage,
  },
  getCommentsPost: {
    comments: commentFromStorage,
  },
}

const middleware = [thunk]

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
