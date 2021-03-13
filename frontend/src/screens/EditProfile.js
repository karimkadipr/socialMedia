import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { getMyProfile } from '../profile/profileActions'
import {
  GET_PROFILE_RESET,
  UPDATE_PROFILE_RESET,
} from '../profile/profileConstants'
import { GET_MY_POST_RESET } from '../post/postConstants'
import {
  OutlinedInput,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from '@material-ui/core'
import { updateProfile } from '../profile/profileActions'
import './styles/createProfile.scss'

const EditProfile = ({ history }) => {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [pseudo, setPseudo] = useState('')
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

  const getMyProfileValue = useSelector((state) => state.getMyProfile)
  const { profileInfo } = getMyProfileValue

  const updateProfileValue = useSelector((state) => state.updateProfile)
  const { profileInfoUpdated, success: updateSuccess } = updateProfileValue

  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    }
    if (updateSuccess) {
      history.push('/profile')
    }
    if (!profileInfo) {
      dispatch(getMyProfile())
    } else {
      profileInfo.user && setName(profileInfo.user.name)
      profileInfo.phone && setPhone(profileInfo.phone)
      profileInfo.user && setPseudo(profileInfo.user.pseudo)
      profileInfo.location && setCity(profileInfo.location.city)
      profileInfo.location && setCountry(profileInfo.location.country)
      profileInfo.avatar && setAvatar(profileInfo.avatar)
      profileInfo.coverImage && setCoverImage(profileInfo.coverImage)
      profileInfo.bio && setBio(profileInfo.bio)
      profileInfo.website && setWebsite(profileInfo.website)
    }
  }, [dispatch, profileInfo, history, updateSuccess])

  useEffect(() => {
    return () => {
      dispatch({
        type: GET_PROFILE_RESET,
      })
      dispatch({
        type: UPDATE_PROFILE_RESET,
      })
      dispatch({
        type: GET_MY_POST_RESET,
      })
    }
  }, [dispatch])

  const handleSubmit = async (e) => {
    e.preventDefault()
    await dispatch(
      updateProfile({
        name,
        pseudo,
        phone,
        avatar,
        coverImage,
        website,
        bio,
        city,
        country,
      })
    )
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

  return (
    <div className='the_hole_create_profile_page'>
      <div className='create_profile_container'>
        <h1>Edit your profile </h1>

        <form onSubmit={handleSubmit}>
          <InputLabel id='demo-simple-select-label'>Name</InputLabel>
          <div className='create_profile_input_container'>
            <OutlinedInput
              type='text'
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder='Enter your Name'
              required
              fullWidth={true}
            />
          </div>
          <InputLabel id='demo-simple-select-label'>Pseudo</InputLabel>
          <div className='create_profile_input_container'>
            <OutlinedInput
              type='text'
              value={pseudo}
              helperText='Required *'
              onChange={(e) => setPseudo(e.target.value)}
              placeholder='Enter your Pseudo'
              required
              fullWidth={true}
            />
          </div>
          <InputLabel id='demo-simple-select-label'>Phone</InputLabel>
          <div className='create_profile_input_container'>
            <OutlinedInput
              type='text'
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder='Enter your Phone'
              required
              fullWidth={true}
            />
          </div>
          <InputLabel id='demo-simple-select-label'>Location</InputLabel>
          <div className='create_profile_input_container'>
            <div style={{ width: '45%', marginRight: '5%' }}>
              <OutlinedInput
                type='text'
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder='Enter your City'
                fullWidth={true}
              />
            </div>

            <div style={{ width: '45%' }}>
              <OutlinedInput
                type='text'
                value={country}
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
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder='Enter your Bio'
              fullWidth={true}
            />
          </div>
          <InputLabel id='demo-simple-select-label'>WebSite</InputLabel>
          <div className='create_profile_input_container'>
            <OutlinedInput
              type='text'
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              placeholder='Enter your Website'
              fullWidth={true}
            />
          </div>

          <Button className='create_submit_button' type='submit'>
            Update
          </Button>
        </form>
      </div>
    </div>
  )
}

export default EditProfile
