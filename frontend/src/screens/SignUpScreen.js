import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { registerUser } from '../user/userActions'
import { OutlinedInput, Button } from '@material-ui/core'
import InputAdornment from '@material-ui/core/InputAdornment'
import IconButton from '@material-ui/core/IconButton'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import ErrorSuccess from '../components/ErrorSuccess'
import './styles/signupscreen.scss'

const SignUpScreen = ({ history }) => {
  const [name, setName] = useState('')
  const [pseudo, setPseudo] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const userRegister = useSelector((state) => state.userRegister)
  const { error } = userRegister

  useEffect(() => {
    if (userInfo) {
      history.push('/createprofile')
    }
  }, [userInfo, dispatch, history])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (password === confirmPassword) {
      dispatch(registerUser({ email, password, name, pseudo }))
    }
  }

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  }
  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword)
  }

  return (
    <div className='hole_screen'>
      <div className='left_side_screen'>
        <img src='./images/lohp_en_1302x955.png' alt='Nothing loaded' />
      </div>
      <div className='right_side_screen'>
        <div className='sign_up_screen_container'>
          <h3>Join us !</h3>
          {error && (
            <ErrorSuccess color='red'>
              This email or pseudo already exist
            </ErrorSuccess>
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
            <div className='input_sign_up_container'>
              <OutlinedInput
                type='text'
                onChange={(e) => setName(e.target.value)}
                placeholder='Enter your Name'
                fullWidth={true}
              />
            </div>
            <div className='input_sign_up_container'>
              <OutlinedInput
                type='text'
                onChange={(e) => setPseudo(e.target.value)}
                placeholder='Enter your Pseudo (must be unique)'
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
            <div>
              <OutlinedInput
                id='standard-adornment-password'
                placeholder='Confirm your Password'
                fullWidth={true}
                type={showConfirmPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                endAdornment={
                  <InputAdornment position='end'>
                    <IconButton
                      aria-label='toggle password visibility'
                      onClick={handleClickShowConfirmPassword}>
                      {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
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
                onClick={() => history.push('/login')}>
                Log In
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default SignUpScreen
