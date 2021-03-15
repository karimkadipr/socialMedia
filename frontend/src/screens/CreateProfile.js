import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { FormControl } from '@material-ui/core'
import {
  OutlinedInput,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from '@material-ui/core'
import { GET_PROFILE_RESET } from '../profile/profileConstants'
import {
  GET_MY_POST_RESET,
  GET_POSTS_FOR_HOME_RESET,
} from '../post/postConstants'
import { logout } from '../user/userActions'
import { createProfile } from '../profile/profileActions'
import ErrorMessage from '../components/ErrorSuccess'
import classNames from 'classnames'
import './styles/createProfile.scss'

const CreateProfile = ({ history }) => {
  const [phone, setPhone] = useState('')
  const [day, setDay] = useState(1)
  const [month, setMonth] = useState('')
  const [year, setYear] = useState(0)
  const [bio, setBio] = useState('')
  const [city, setCity] = useState('')
  const [country, setCountry] = useState('')
  const [avatar, setAvatar] = useState('')
  const [coverImage, setCoverImage] = useState('')
  const [website, setWebsite] = useState('')
  const [uploading, setUploading] = useState(false)

  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const darkModeValue = useSelector((state) => state.darkMode)
  const { darkMode } = darkModeValue

  const createProfileValue = useSelector((state) => state.createProfile)
  const { profileInfo, error } = createProfileValue

  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    }
    if (profileInfo) {
      history.push('/profile')
    }
  }, [userInfo, dispatch, profileInfo, history])
  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(
      createProfile({
        phone,
        day,
        month,
        year,
        avatar,
        coverImage,
        website,
        bio,
        city,
        country,
      })
    )
  }
  let arr = ['Day']
  for (let i = 1; i <= 31; i++) {
    arr.push(i)
  }

  let arrMonth = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'august',
    'September',
    'October',
    'November',
    'December',
  ]

  let arrYear = []
  for (let i = 1900; i <= 2021; i++) {
    arrYear.push(i)
  }

  const uploadFileHandlerAvatar = async (e) => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('image', file)
    setUploading(true)
    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
      const { data } = await axios.post('/api/upload/avatar', formData, config)
      setAvatar(data)
      setUploading(false)
    } catch (error) {
      console.error(error)
      setUploading(false)
    }
  }

  const uploadFileHandlerCover = async (e) => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('image', file)
    setUploading(true)
    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
      const { data } = await axios.post('/api/upload/cover', formData, config)
      setCoverImage(data)
      setUploading(false)
    } catch (error) {
      console.error(error)
      setUploading(false)
    }
  }

  const handleLogout = () => {
    dispatch(logout())
    dispatch({
      type: GET_PROFILE_RESET,
    })
    dispatch({
      type: GET_MY_POST_RESET,
    })
    dispatch({
      type: GET_POSTS_FOR_HOME_RESET,
    })

    history.push('/login')
  }

  const profilePageStyle = classNames(
    'the_hole_create_profile_page',
    'the_hole_create_profile_page_light'
  )
  const profilePageStyleDark = classNames(
    'the_hole_create_profile_page',
    'the_hole_create_profile_page_dark'
  )

  return (
    <div className={darkMode ? profilePageStyleDark : profilePageStyle}>
      <div className='create_profile_container'>
        <h1>Create your profile !</h1>
        <form onSubmit={handleSubmit}>
          {error && (
            <ErrorMessage color='red'>
              Phone number and birth date are required
            </ErrorMessage>
          )}
          <InputLabel id='demo-simple-select-label'>Phone Number*</InputLabel>
          <div className='create_profile_input_container'>
            <OutlinedInput
              type='text'
              onChange={(e) => setPhone(e.target.value)}
              placeholder='Enter your Phone'
              fullWidth={true}
            />
          </div>

          <div className='create_profile_input_container'>
            <div
              style={{
                marginRight: '1rem',
                fontSize: 18,
                fontWeight: '700',
              }}>
              Date of Birth* :
            </div>

            <FormControl
              variant='outlined'
              fullWidth
              style={{ width: '25%', marginRight: '1%' }}>
              <InputLabel id='demo-simple-select-outlined-label'>
                Day
              </InputLabel>
              <Select
                fullWidth
                labelId='demo-simple-select-outlined-label'
                id='demo-simple-select-outlined'
                label='Day'
                onChange={(e) => setDay(e.target.value)}>
                {arr.map((item) => (
                  <MenuItem key={item} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl
              variant='outlined'
              fullWidth
              style={{ width: '25%', marginRight: '1%' }}>
              <InputLabel id='demo-simple-select-label'>Month</InputLabel>
              <Select
                fullWidth
                labelId='demo-simple-select-outlined-label'
                id='demo-simple-select-outlined'
                label='Month'
                onChange={(e) => setMonth(e.target.value)}>
                {arrMonth.map((item) => (
                  <MenuItem key={item} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl variant='outlined' fullWidth style={{ width: '25%' }}>
              <InputLabel id='demo-simple-select-label'>Year</InputLabel>
              <Select
                fullWidth
                labelId='demo-simple-select-outlined-label'
                id='demo-simple-select-outlined'
                label='Year'
                onChange={(e) => setYear(e.target.value)}>
                {arrYear.map((item) => (
                  <MenuItem key={item} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <InputLabel id='demo-simple-select-label'>Location</InputLabel>
          <div className='create_profile_input_container'>
            <div style={{ width: '45%', marginRight: '5%' }}>
              <OutlinedInput
                type='text'
                onChange={(e) => setCity(e.target.value)}
                placeholder='Enter your City'
                fullWidth={true}
              />
            </div>
            <div style={{ width: '45%' }}>
              <OutlinedInput
                type='text'
                onChange={(e) => setCountry(e.target.value)}
                placeholder='Enter your Country'
                fullWidth={true}
              />
            </div>
          </div>
          <InputLabel id='demo-simple-select-label'>Profile / Cover</InputLabel>
          <div className='create_profile_input_container'>
            <div style={{ width: '45%', marginRight: '5%' }}>
              <OutlinedInput
                type='text'
                value={avatar}
                onChange={(e) => setAvatar(e.target.value)}
                placeholder='Enter your Avatar Image'
                fullWidth={true}
              />
              <input
                className='custom-file-input'
                type='file'
                id='img'
                name='img'
                onChange={uploadFileHandlerAvatar}
              />
              {uploading && <div>Uploading ...</div>}
            </div>
            <div style={{ width: '45%' }}>
              <OutlinedInput
                type='text'
                value={coverImage}
                onChange={(e) => setCoverImage(e.target.value)}
                placeholder='Enter your Cover Image'
                fullWidth={true}
              />
              <input
                className='custom-file-input'
                type='file'
                id='img'
                name='img'
                onChange={uploadFileHandlerCover}
              />
              {uploading && <div>Uploading ...</div>}
            </div>
          </div>
          <InputLabel id='demo-simple-select-label'>Bio</InputLabel>
          <div className='create_profile_input_container'>
            <OutlinedInput
              type='text'
              onChange={(e) => setBio(e.target.value)}
              placeholder='Enter your Bio'
              fullWidth={true}
            />
          </div>
          <InputLabel id='demo-simple-select-label'>Website</InputLabel>
          <div className='create_profile_input_container'>
            <OutlinedInput
              type='text'
              onChange={(e) => setWebsite(e.target.value)}
              placeholder='Enter your Website'
              fullWidth={true}
            />
          </div>
          <div className='buttons_container_create_profile'>
            <Button className='create_submit_button' type='submit'>
              Create
            </Button>
            <Button className='logout_submit_button' onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateProfile
