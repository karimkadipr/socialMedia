import axios from 'axios'
import {
  CREATE_PROFILE_FAIL,
  CREATE_PROFILE_REQUEST,
  CREATE_PROFILE_SUCCESS,
  GET_PROFILE_REQUEST,
  GET_PROFILE_SUCCESS,
  GET_PROFILE_FAIL,
  GET_ALL_PROFILE_REQUEST,
  GET_ALL_PROFILE_SUCCESS,
  GET_ALL_PROFILE_FAIL,
  GET_PROFILE_BY_ID_REQUEST,
  GET_PROFILE_BY_ID_SUCCESS,
  GET_PROFILE_BY_ID_FAIL,
  FOLLOW_PROFILE_REQUEST,
  FOLLOW_PROFILE_SUCCESS,
  FOLLOW_PROFILE_FAIL,
  UNFOLLOW_PROFILE_REQUEST,
  UNFOLLOW_PROFILE_SUCCESS,
  UNFOLLOW_PROFILE_FAIL,
  ISFOLLOW_PROFILE_REQUEST,
  ISFOLLOW_PROFILE_SUCCESS,
  ISFOLLOW_PROFILE_FAIL,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAIL,
} from './profileConstants'

const createProfile = (profile) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CREATE_PROFILE_REQUEST,
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

    const { data } = await axios.post('/api/profile', profile, config)

    dispatch({
      type: CREATE_PROFILE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: CREATE_PROFILE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

const updateProfile = (profile) => async (dispatch, getState) => {
  try {
    dispatch({
      type: UPDATE_PROFILE_REQUEST,
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

    const { data } = await axios.put('/api/profile', profile, config)

    dispatch({
      type: UPDATE_PROFILE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: UPDATE_PROFILE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

const getMyProfile = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_PROFILE_REQUEST,
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

    const { data } = await axios.get('/api/profile', config)

    dispatch({
      type: GET_PROFILE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: GET_PROFILE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

const getAllProfiles = (keyword = '') => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_ALL_PROFILE_REQUEST,
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

    const { data } = await axios.get(
      `/api/profile/all?keyword=${keyword}`,
      config
    )

    dispatch({
      type: GET_ALL_PROFILE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: GET_ALL_PROFILE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

const getProfileById = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_PROFILE_BY_ID_REQUEST,
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

    const { data } = await axios.get(`/api/profile/${id}`, config)

    dispatch({
      type: GET_PROFILE_BY_ID_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: GET_PROFILE_BY_ID_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

const followProfile = (profileId) => async (dispatch, getState) => {
  try {
    dispatch({
      type: FOLLOW_PROFILE_REQUEST,
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

    await axios.post(`/api/profile/follow/${profileId}`, {}, config)

    dispatch({
      type: FOLLOW_PROFILE_SUCCESS,
    })
  } catch (error) {
    dispatch({
      type: FOLLOW_PROFILE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

const unFollowProfile = (profileId) => async (dispatch, getState) => {
  try {
    dispatch({
      type: UNFOLLOW_PROFILE_REQUEST,
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

    await axios.post(`/api/profile/unfollow/${profileId}`, {}, config)

    dispatch({
      type: UNFOLLOW_PROFILE_SUCCESS,
    })
  } catch (error) {
    dispatch({
      type: UNFOLLOW_PROFILE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

const isFollowProfile = (profileId) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ISFOLLOW_PROFILE_REQUEST,
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

    const { data } = await axios.get(
      `/api/profile/isfollowed/${profileId}`,
      config
    )

    dispatch({
      type: ISFOLLOW_PROFILE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: ISFOLLOW_PROFILE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export {
  isFollowProfile,
  createProfile,
  getMyProfile,
  getAllProfiles,
  getProfileById,
  followProfile,
  unFollowProfile,
  updateProfile,
}
