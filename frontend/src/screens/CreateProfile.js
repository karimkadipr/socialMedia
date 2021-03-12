import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  OutlinedInput,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from '@material-ui/core'
import { createProfile } from '../profile/profileActions'
import './styles/createProfile.scss'

const CreateProfile = ({ history }) => {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [pseudo, setPseudo] = useState('')
  const [day, setDay] = useState(1)
  const [month, setMonth] = useState('')
  const [year, setYear] = useState(0)
  const [bio, setBio] = useState('')
  const [city, setCity] = useState('')
  const [country, setCountry] = useState('')
  const [avatar, setAvatar] = useState('')
  const [coverImage, setCoverImage] = useState('')
  const [website, setWebsite] = useState('')

  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const createProfileValue = useSelector((state) => state.createProfile)
  const { profileInfo } = createProfileValue

  useEffect(() => {
    if (userInfo) {
      setName(userInfo.name)
    }
    if (profileInfo) {
      history.push('/profile')
    }
  }, [userInfo, dispatch, profileInfo, history])
  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(
      createProfile({
        name,
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
  let arr = []
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
    'September',
    'October',
    'November',
    'December',
  ]

  let arrYear = []
  for (let i = 1900; i <= 2021; i++) {
    arrYear.push(i)
  }

  return (
    <div className='the_hole_create_profile_page'>
      <div className='create_profile_container'>
        <h1>Create your profile !</h1>
        <form onSubmit={handleSubmit}>
          <InputLabel id='demo-simple-select-label'>Phone Number*</InputLabel>
          <div className='create_profile_input_container'>
            <OutlinedInput
              type='text'
              helperText='Required *'
              onChange={(e) => setPhone(e.target.value)}
              placeholder='Enter your Phone'
              required
              fullWidth={true}
            />
          </div>

          <div className='create_profile_input_container'>
            <div
              style={{ marginRight: '1rem', fontSize: 18, fontWeight: '700' }}>
              Date of Birth :
            </div>
            <div style={{ width: '25%', marginRight: '1%' }}>
              <InputLabel id='demo-simple-select-label'>Day*</InputLabel>
              <Select
                fullWidth
                labelId='demo-simple-select-label'
                id='demo-simple-select'
                defaultValue='1'
                onChange={(e) => setDay(e.target.value)}>
                {arr.map((item) => (
                  <MenuItem key={item} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
            </div>
            <div style={{ width: '25%', marginRight: '1%' }}>
              <InputLabel id='demo-simple-select-label'>Month*</InputLabel>
              <Select
                fullWidth
                labelId='demo-simple-select-label'
                id='demo-simple-select'
                defaultValue='January'
                onChange={(e) => setMonth(e.target.value)}>
                {arrMonth.map((item) => (
                  <MenuItem key={item} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
            </div>
            <div style={{ width: '25%' }}>
              <InputLabel id='demo-simple-select-label'>Year*</InputLabel>
              <Select
                fullWidth
                labelId='demo-simple-select-label'
                id='demo-simple-select'
                defaultValue='2000'
                onChange={(e) => setYear(e.target.value)}>
                {arrYear.map((item) => (
                  <MenuItem key={item} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
            </div>
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
                onChange={(e) => setAvatar(e.target.value)}
                placeholder='Enter your Avatar Image'
                fullWidth={true}
              />
              <button>Upload</button>
            </div>
            <div style={{ width: '45%' }}>
              <OutlinedInput
                type='text'
                onChange={(e) => setCoverImage(e.target.value)}
                placeholder='Enter your Cover Image'
                fullWidth={true}
              />
              <button>Upload</button>
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

          <Button className='create_submit_button' type='submit'>
            Create
          </Button>
        </form>
      </div>
    </div>
  )
}

export default CreateProfile
