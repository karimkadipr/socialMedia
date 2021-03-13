import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getAllProfiles } from '../profile/profileActions'
import { Button } from '@material-ui/core'
import RightSide from '../components/RightSide'
import './styles/discoverProfiles.scss'
import './styles/layout.scss'
import LeftSide from '../components/LeftSide'

const DiscoverProfiles = ({ match }) => {
  const keyword = match.params.keyword

  const dispatch = useDispatch()

  const getAllProfilesValues = useSelector((state) => state.getAllProfiles)
  const { profiles } = getAllProfilesValues

  useEffect(() => {
    dispatch(getAllProfiles(keyword))
  }, [dispatch, keyword])

  return (
    <div className='content_container'>
      <div className='left_container'>
        <div className='list_container'>
          <LeftSide post />
        </div>
      </div>
      <div className='right_container'>
        <div className='main_content'>
          <div className='main_content_left'>
            <div className='Home_Title'>
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
          <RightSide profiles={profiles} />
        </div>
      </div>
    </div>
  )
}

export default DiscoverProfiles
