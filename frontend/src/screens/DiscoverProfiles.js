import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getAllProfiles } from '../profile/profileActions'
import { logout } from '../user/userActions'
import { IconButton, OutlinedInput, InputBase, Button } from '@material-ui/core'
import MoreIcon from '@material-ui/icons/More'
import TwitterIcon from '@material-ui/icons/Twitter'
import { ReactComponent as ProfileSvg } from './images/man.svg'
import { ReactComponent as HomeSvg } from './images/house.svg'
import { ReactComponent as TelescopeSvg } from './images/telescope.svg'
import './styles/discoverProfiles.scss'

const DiscoverProfiles = ({ history }) => {
  const dispatch = useDispatch()

  const getAllProfilesValues = useSelector((state) => state.getAllProfiles)
  const { profiles } = getAllProfilesValues

  useEffect(() => {
    dispatch(getAllProfiles())
  }, [dispatch])

  const handleLogout = () => {
    dispatch(logout())
    history.push('/login')
  }
  return (
    <div className='content_container_home'>
      <div className='left_container_home'>
        <div className='list_container_home'>
          <div className='fixed_sidebar_profile_home'>
            <Link to='/'>
              <IconButton>
                <TwitterIcon />
              </IconButton>
            </Link>
            <Link to='/'>
              <HomeSvg /> Home
            </Link>
            <Link to='/profile'>
              <ProfileSvg /> Profile
            </Link>
            <Link to='/profiles'>
              <TelescopeSvg /> Discover
            </Link>

            <button onClick={() => history.push('/')} className='btn-main'>
              Post
            </button>
          </div>
        </div>
      </div>
      <div className='right_container_home'>
        <div className='main_content_home'>
          <div className='main_content_left_home'>
            <div className='Home_Title_home'>
              <h3>Connect</h3>
            </div>
            <div className='suggestion_all_users'>
              <h3>Suggested for you</h3>
            </div>
            <div className='users_container_discover'>
              {profiles &&
                profiles.map((profile) => (
                  <Link key={profile._id} to={`/profile/${profile._id}`}>
                    {profile.avatar ? (
                      <img src={profile.avatar} alt='No profil pic' />
                    ) : (
                      <img
                        src='/images/empty_profile_pic.jpg'
                        alt='No profil pic'
                      />
                    )}
                    <div className='username_pseudo'>
                      <p>{profile.user.name}</p>
                      <p>@{profile.user.pseudo}</p>
                      {profile.bio && <p>{profile.bio}</p>}
                    </div>
                    <div className='button_container'>
                      <Button className='see_profile' variant='outlined'>
                        See Profile
                      </Button>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
          <div className='main_content_right_home'>
            <div className='search_bar_home'>
              <OutlinedInput
                type='text'
                placeholder='Enter your Name'
                fullWidth={true}
              />
            </div>
            <div className='you_might_know_home'>
              <div className='who_to_follow'> Who to follow</div>
              {profiles &&
                profiles.slice(0, 5).map((profile) => (
                  <Link key={profile._id} to={`/profile/${profile._id}`}>
                    <img
                      src='/images/empty_profile_pic.jpg'
                      alt='No profil pic'
                    />
                    <div>
                      <p>{profile.user.name}</p>
                      <p>@{profile.user.pseudo}</p>
                    </div>

                    <IconButton>
                      <MoreIcon />
                    </IconButton>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DiscoverProfiles
