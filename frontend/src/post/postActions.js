import axios from 'axios'
import {
  GET_MY_POSTS_FAIL,
  GET_MY_POSTS_REQUEST,
  GET_MY_POSTS_SUCCESS,
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
  GET_COMMENTS_POST_REQUEST,
  GET_COMMENTS_POST_SUCCESS,
  GET_COMMENTS_POST_FAIL,
  GET_POSTS_BY_PROFILE_REQUEST,
  GET_POSTS_BY_PROFILE_SUCCESS,
  GET_POSTS_BY_PROFILE_FAIL,
  GET_POSTS_FOR_HOME_REQUEST,
  GET_POSTS_FOR_HOME_SUCCESS,
  GET_POSTS_FOR_HOME_FAIL,
  ISLIKED_POST_REQUEST,
  ISLIKED_POST_SUCCESS,
  ISLIKED_POST_FAIL,
  DELETE_COMMENT_POST_REQUEST,
  DELETE_COMMENT_POST_SUCCESS,
  DELETE_COMMENT_POST_FAIL,
} from './postConstants'

const getMyPosts = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_MY_POSTS_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get('/api/posts', config)

    dispatch({
      type: GET_MY_POSTS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: GET_MY_POSTS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

const deletePostById = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: DELETE_POST_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    await axios.delete(`/api/posts/${id}`, config)
    dispatch({
      type: DELETE_POST_SUCCESS,
    })
  } catch (error) {
    dispatch({
      type: DELETE_POST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

const likePostById = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: LIKE_POST_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    await axios.post(`/api/posts/like/${id}`, {}, config)

    dispatch({
      type: LIKE_POST_SUCCESS,
    })
  } catch (error) {
    dispatch({
      type: LIKE_POST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

const deleteLikePostById = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: DELETE_LIKE_POST_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    await axios.delete(`/api/posts/like/${id}`, config)

    dispatch({
      type: DELETE_LIKE_POST_SUCCESS,
    })
  } catch (error) {
    dispatch({
      type: DELETE_LIKE_POST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

const commentPostById = (comment, id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: COMMENT_POST_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.post(
      `/api/posts/comment/${id}`,
      { text: comment },
      config
    )

    dispatch({
      type: COMMENT_POST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: COMMENT_POST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

const addPost = (text) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ADD_POST_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.post(`/api/posts/`, { text }, config)

    dispatch({
      type: ADD_POST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: ADD_POST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

const getAnyPost = (userId, postId) => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_ANY_POST_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(`/api/posts/${userId}/${postId}`, config)

    dispatch({
      type: GET_ANY_POST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: GET_ANY_POST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

const getCommentsPost = (postId) => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_COMMENTS_POST_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(`/api/posts/comment/${postId}`, config)

    dispatch({
      type: GET_COMMENTS_POST_SUCCESS,
      payload: data,
    })

    localStorage.setItem('userComments', JSON.stringify(data))
  } catch (error) {
    dispatch({
      type: GET_COMMENTS_POST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

const getPostsByProfile = (profileId) => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_POSTS_BY_PROFILE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(`/api/posts/all/${profileId}`, config)

    dispatch({
      type: GET_POSTS_BY_PROFILE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: GET_POSTS_BY_PROFILE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

const getPostsForHomePage = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_POSTS_FOR_HOME_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get('/api/posts/subsposts', config)

    dispatch({
      type: GET_POSTS_FOR_HOME_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: GET_POSTS_FOR_HOME_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

const isLikedPost = (postId) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ISLIKED_POST_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(`/api/posts/checklike/${postId}`, config)

    dispatch({
      type: ISLIKED_POST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: ISLIKED_POST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

const deleteCommentFromPost = (postId, commentId) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: DELETE_COMMENT_POST_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    await axios.delete(`/api/posts/comment/${postId}/${commentId}`, config)

    dispatch({
      type: DELETE_COMMENT_POST_SUCCESS,
    })
  } catch (error) {
    dispatch({
      type: DELETE_COMMENT_POST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export {
  getMyPosts,
  deletePostById,
  likePostById,
  commentPostById,
  deleteLikePostById,
  addPost,
  getAnyPost,
  getCommentsPost,
  getPostsByProfile,
  getPostsForHomePage,
  isLikedPost,
  deleteCommentFromPost,
}
