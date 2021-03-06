import {
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAIL,
  LOGOUT_USER,
} from './userConstants'

export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case LOGIN_USER_REQUEST:
      return { ...state, loading: true }
    case LOGIN_USER_SUCCESS:
      return { loading: false, success: true, userInfo: action.payload }
    case LOGIN_USER_FAIL:
      return { loading: false, error: action.payload }
    case LOGOUT_USER:
      return {}
    default:
      return state
  }
}

export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case REGISTER_USER_REQUEST:
      return { loading: true }
    case REGISTER_USER_SUCCESS:
      return { loading: false, userInfo: action.payload }
    case REGISTER_USER_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
