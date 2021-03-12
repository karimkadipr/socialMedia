import {
  GET_MY_POSTS_FAIL,
  GET_MY_POSTS_REQUEST,
  GET_MY_POSTS_SUCCESS,
  GET_MY_POST_RESET,
  DELETE_POST_REQUEST,
  DELETE_POST_SUCCESS,
  DELETE_POST_FAIL,
  LIKE_POST_REQUEST,
  LIKE_POST_SUCCESS,
  LIKE_POST_FAIL,
  COMMENT_POST_REQUEST,
  COMMENT_POST_SUCCESS,
  COMMENT_POST_FAIL,
  DELETE_LIKE_POST_REQUEST,
  DELETE_LIKE_POST_SUCCESS,
  DELETE_LIKE_POST_FAIL,
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
  ADD_POST_FAIL,
  GET_ANY_POST_REQUEST,
  GET_ANY_POST_SUCCESS,
  GET_ANY_POST_FAIL,
  GET_ANY_POST_RESET,
  GET_COMMENTS_POST_SUCCESS,
  GET_COMMENTS_POST_FAIL,
  GET_COMMENTS_POST_REQUEST,
  GET_COMMENTS_POST_RESET,
  GET_POSTS_BY_PROFILE_REQUEST,
  GET_POSTS_BY_PROFILE_SUCCESS,
  GET_POSTS_BY_PROFILE_FAIL,
  GET_POSTS_BY_PROFILE_RESET,
  GET_POSTS_FOR_HOME_REQUEST,
  GET_POSTS_FOR_HOME_SUCCESS,
  GET_POSTS_FOR_HOME_FAIL,
  GET_POSTS_FOR_HOME_RESET,
  ISLIKED_POST_REQUEST,
  ISLIKED_POST_SUCCESS,
  ISLIKED_POST_FAIL,
  DELETE_COMMENT_POST_REQUEST,
  DELETE_COMMENT_POST_SUCCESS,
  DELETE_COMMENT_POST_FAIL,
} from './postConstants'

export const getMyPostsReducer = (state = { posts: [] }, action) => {
  switch (action.type) {
    case GET_MY_POSTS_REQUEST:
      return { ...state, loading: true }
    case GET_MY_POSTS_SUCCESS:
      return { loading: false, posts: action.payload }
    case GET_MY_POSTS_FAIL:
      return { loading: false, error: action.payload }
    case GET_MY_POST_RESET:
      return { posts: [] }
    default:
      return state
  }
}

export const deletePostReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_POST_REQUEST:
      return { loading: true }
    case DELETE_POST_SUCCESS:
      return { loading: false, success: true }
    case DELETE_POST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const likePostReducer = (state = {}, action) => {
  switch (action.type) {
    case LIKE_POST_REQUEST:
      return { loading: true }
    case LIKE_POST_SUCCESS:
      return { loading: false, success: true }
    case LIKE_POST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const deleteLikePostReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_LIKE_POST_REQUEST:
      return { loading: true }
    case DELETE_LIKE_POST_SUCCESS:
      return { loading: false, success: true }
    case DELETE_LIKE_POST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const commentPostReducer = (state = {}, action) => {
  switch (action.type) {
    case COMMENT_POST_REQUEST:
      return { loading: true }
    case COMMENT_POST_SUCCESS:
      return { loading: false, success: true }
    case COMMENT_POST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const getCommentsPostReducer = (state = { comments: [] }, action) => {
  switch (action.type) {
    case GET_COMMENTS_POST_REQUEST:
      return { ...state, loading: true }
    case GET_COMMENTS_POST_SUCCESS:
      return { loading: false, success: true, comments: action.payload }
    case GET_COMMENTS_POST_FAIL:
      return { loading: false, error: action.payload }
    case GET_COMMENTS_POST_RESET:
      return { ...state, success: false }
    default:
      return state
  }
}

export const addPostReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_POST_REQUEST:
      return { loading: true }
    case ADD_POST_SUCCESS:
      return { loading: false, success: true, post: action.payload }
    case ADD_POST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const getAnyPostReducer = (state = { post: {} }, action) => {
  switch (action.type) {
    case GET_ANY_POST_REQUEST:
      return { ...state, loading: true }
    case GET_ANY_POST_SUCCESS:
      return { loading: false, success: true, post: action.payload }
    case GET_ANY_POST_FAIL:
      return { loading: false, error: action.payload }
    case GET_ANY_POST_RESET:
      return { post: {} }
    default:
      return state
  }
}

export const getPostsByProfileReducer = (state = { posts: [] }, action) => {
  switch (action.type) {
    case GET_POSTS_BY_PROFILE_REQUEST:
      return { ...state, loading: true }
    case GET_POSTS_BY_PROFILE_SUCCESS:
      return { loading: false, success: true, posts: action.payload }
    case GET_POSTS_BY_PROFILE_FAIL:
      return { loading: false, error: action.payload }
    case GET_POSTS_BY_PROFILE_RESET:
      return { posts: [] }
    default:
      return state
  }
}

export const getPostsForHomePageReducer = (state = { posts: [] }, action) => {
  switch (action.type) {
    case GET_POSTS_FOR_HOME_REQUEST:
      return { ...state, loading: true }
    case GET_POSTS_FOR_HOME_SUCCESS:
      return { loading: false, success: true, posts: action.payload }
    case GET_POSTS_FOR_HOME_FAIL:
      return { loading: false, error: action.payload }
    case GET_POSTS_FOR_HOME_RESET:
      return { posts: [] }
    default:
      return state
  }
}

export const isLikedPostReducer = (state = { isLiked: {} }, action) => {
  switch (action.type) {
    case ISLIKED_POST_REQUEST:
      return { ...state, loading: true }
    case ISLIKED_POST_SUCCESS:
      return { loading: false, success: true, isLiked: action.payload }
    case ISLIKED_POST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const deleteCommentReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_COMMENT_POST_REQUEST:
      return { loading: true }
    case DELETE_COMMENT_POST_SUCCESS:
      return { loading: false, success: true }
    case DELETE_COMMENT_POST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
