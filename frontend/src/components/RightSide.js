import React, { useState } from 'react'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'
import { IconButton, OutlinedInput } from '@material-ui/core'
import MoreIcon from '@material-ui/icons/More'
import './styles/rightSide.scss'

const RightSide = ({ profiles, showMore, history }) => {
  const [keyword, setKeyword] = useState('')

  const handleKeypress = (e) => {
    if (e.keyCode === 13) {
      if (keyword === '') {
        history.push('/')
      } else {
        history.push(`/profiles/${keyword}`)
      }
    }
  }

  return (
    <div className='main_content_right'>
      <div className='search_bar'>
        <OutlinedInput
          onKeyUp={handleKeypress}
          onChange={(e) => setKeyword(e.target.value)}
          type='text'
          placeholder='Search for new friends '
          fullWidth={true}
        />
      </div>
      <div className='you_might_know'>
        <div className='who_to_follow'> Who to follow</div>
        {profiles &&
          profiles.slice(0, 5).map((profile) => (
            <Link key={profile._id} to={`/profile/${profile._id}`}>
              {profile.avatar ? (
                <img src={profile.avatar} alt='No profil pic' />
              ) : (
                <img src='/images/empty_profile_pic.jpg' alt='No profil pic' />
              )}
              <div className='shortcut_user_container'>
                <p>{profile.user.name}</p>
                <p>@{profile.user.pseudo}</p>
              </div>
              <IconButton>
                <MoreIcon />
              </IconButton>
            </Link>
          ))}
        {showMore && (
          <div className='who_to_follow'>
            <Link to='/profiles'>Show more</Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default withRouter(RightSide)
