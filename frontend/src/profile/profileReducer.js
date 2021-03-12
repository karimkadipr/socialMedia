import {
  CREATE_PROFILE_FAIL,
  CREATE_PROFILE_REQUEST,
  CREATE_PROFILE_SUCCESS,
  GET_PROFILE_REQUEST,
  GET_PROFILE_SUCCESS,
  GET_PROFILE_FAIL,
  GET_PROFILE_RESET,
  GET_ALL_PROFILE_REQUEST,
  GET_ALL_PROFILE_SUCCESS,
  GET_ALL_PROFILE_FAIL,
  GET_PROFILE_BY_ID_REQUEST,
  GET_PROFILE_BY_ID_SUCCESS,
  GET_PROFILE_BY_ID_FAIL,
  GET_PROFILE_BY_ID_RESET,
  FOLLOW_PROFILE_SUCCESS,
  FOLLOW_PROFILE_FAIL,
  FOLLOW_PROFILE_REQUEST,
  UNFOLLOW_PROFILE_REQUEST,
  UNFOLLOW_PROFILE_SUCCESS,
  UNFOLLOW_PROFILE_FAIL,
  ISFOLLOW_PROFILE_REQUEST,
  ISFOLLOW_PROFILE_SUCCESS,
  ISFOLLOW_PROFILE_FAIL,
  ISFOLLOW_PROFILE_RESET,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAIL,
  UPDATE_PROFILE_RESET,
} from './profileConstants'

export const createProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_PROFILE_REQUEST:
      return { loading: true }
    case CREATE_PROFILE_SUCCESS:
      return { loading: false, profileInfo: action.payload }
    case CREATE_PROFILE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const getMyProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_PROFILE_REQUEST:
      return { loading: true }
    case GET_PROFILE_SUCCESS:
      return { loading: false, profileInfo: action.payload }
    case GET_PROFILE_FAIL:
      return { loading: false, error: action.payload }
    case GET_PROFILE_RESET:
      return {}
    default:
      return state
  }
}

export const getAllProfilesReducer = (state = { profiles: [] }, action) => {
  switch (action.type) {
    case GET_ALL_PROFILE_REQUEST:
      return { ...state, loading: true }
    case GET_ALL_PROFILE_SUCCESS:
      return { loading: false, profiles: action.payload }
    case GET_ALL_PROFILE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const getProfileByIdReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_PROFILE_BY_ID_REQUEST:
      return { ...state, loading: true }
    case GET_PROFILE_BY_ID_SUCCESS:
      return { loading: false, success: true, profileInfo: action.payload }
    case GET_PROFILE_BY_ID_FAIL:
      return { loading: false, error: action.payload }
    case GET_PROFILE_BY_ID_RESET:
      return {}
    default:
      return state
  }
}

export const followProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case FOLLOW_PROFILE_REQUEST:
      return { loading: true }
    case FOLLOW_PROFILE_SUCCESS:
      return { loading: false, success: true }
    case FOLLOW_PROFILE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const unFollowProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case UNFOLLOW_PROFILE_REQUEST:
      return { loading: true }
    case UNFOLLOW_PROFILE_SUCCESS:
      return { loading: false, success: true }
    case UNFOLLOW_PROFILE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const isFollowProfileReducer = (state = { isFollowing: {} }, action) => {
  switch (action.type) {
    case ISFOLLOW_PROFILE_REQUEST:
      return { ...state, loading: true }
    case ISFOLLOW_PROFILE_SUCCESS:
      return { loading: false, success: true, isFollowing: action.payload }
    case ISFOLLOW_PROFILE_FAIL:
      return { loading: false, error: action.payload }
    case ISFOLLOW_PROFILE_RESET: {
      return { isFollowing: {} }
    }
    default:
      return state
  }
}

export const updateProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_PROFILE_REQUEST:
      return { loading: true }
    case UPDATE_PROFILE_SUCCESS:
      return { loading: false, success: true, profileInfo: action.payload }
    case UPDATE_PROFILE_FAIL:
      return { loading: false, error: action.payload }
    case UPDATE_PROFILE_RESET:
      return {}
    default:
      return state
  }
}
