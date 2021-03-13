import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { userLogin } from '../user/userActions'
import { OutlinedInput, Button } from '@material-ui/core'
import InputAdornment from '@material-ui/core/InputAdornment'
import IconButton from '@material-ui/core/IconButton'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import ErrorSuccess from '../components/ErrorSuccess'
import './styles/signupscreen.scss'

const LoginScreen = ({ history }) => {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const userLoginId = useSelector((state) => state.userLogin)
  const { userInfo, error, success } = userLoginId

  useEffect(() => {
    if (userInfo || success) {
      history.push('/')
    }
  }, [history, userInfo, success])

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(userLogin({ email, password }))
    console.log(password)
  }
  return (
    <div className='hole_screen'>
      <div className='left_side_screen'>
        <img src='./images/lohp_en_1302x955.png' alt='Nothing loaded' />
      </div>
      <div className='right_side_screen'>
        <div className='sign_up_screen_container'>
          <h3>Log In!</h3>
          {error && (
            <ErrorSuccess color='red'>User does not exist</ErrorSuccess>
          )}
          <form className='form_sign_up' onSubmit={handleSubmit}>
            <div>
              <OutlinedInput
                id='component-outlined'
                type='text'
                onChange={(e) => setEmail(e.target.value)}
                placeholder='Enter your Email'
                fullWidth={true}
              />
            </div>
            <div>
              <OutlinedInput
                id='standard-adornment-password'
                placeholder='Enter your Password'
                fullWidth={true}
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                endAdornment={
                  <InputAdornment position='end'>
                    <IconButton
                      aria-label='toggle password visibility'
                      onClick={handleClickShowPassword}>
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </div>
            <div className='buttons_container_signup'>
              <Button className='Submit_button_signup' type='submit'>
                Submit
              </Button>
              <Button
                className='Submit_button_redirect_login'
                onClick={() => history.push('/signup')}>
                Sign Up
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default LoginScreen
