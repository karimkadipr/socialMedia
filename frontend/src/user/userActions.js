import axios from 'axios'
import {
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAIL,
  LOGOUT_USER,
} from './userConstants'

const userLogin = (user) => async (dispatch) => {
  try {
    dispatch({
      type: LOGIN_USER_REQUEST,
    })

    const { data } = await axios.post('/api/users/login', user)

    dispatch({
      type: LOGIN_USER_SUCCESS,
      payload: data,
    })

    localStorage.setItem('userInfo', JSON.stringify(data))
  } catch (error) {
    dispatch({
      type: LOGIN_USER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

const logout = () => async (dispatch) => {
  dispatch({
    type: LOGOUT_USER,
  })
  localStorage.removeItem('userInfo')
}

const registerUser = (user) => async (dispatch) => {
  try {
    dispatch({
      type: REGISTER_USER_REQUEST,
    })

    const { data } = await axios.post('/api/users/register', user)

    dispatch({
      type: REGISTER_USER_SUCCESS,
      payload: data,
    })

    dispatch({
      type: LOGIN_USER_SUCCESS,
      payload: data,
    })
    localStorage.setItem('userInfo', JSON.stringify(data))
  } catch (error) {
    dispatch({
      type: REGISTER_USER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export { userLogin, registerUser, logout }
