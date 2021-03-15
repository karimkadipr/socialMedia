import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'
import { IconButton, OutlinedInput } from '@material-ui/core'
import MoreIcon from '@material-ui/icons/More'
import classNames from 'classnames'
import './styles/rightSide.scss'

const RightSide = ({ profiles, showMore, history, handleChangeLink }) => {
  const [keyword, setKeyword] = useState('')

  const darkModeValue = useSelector((state) => state.darkMode)
  const { darkMode } = darkModeValue

  const handleKeypress = (e) => {
    if (e.keyCode === 13) {
      if (keyword === '') {
        history.push('/')
      } else {
        history.push(`/profiles/${keyword}`)
      }
    }
  }
  const rightStyle = classNames(
    'main_content_right',
    'main_content_right_light'
  )
  const rightStyleDark = classNames(
    'main_content_right',
    'main_content_right_dark'
  )
  return (
    <div className={darkMode ? rightStyleDark : rightStyle}>
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
            <Link
              key={profile._id}
              to={`/profile/${profile._id}`}
              onClick={handleChangeLink}>
              {profile.avatar ? (
                <img src={profile.avatar} alt='No profile pic' />
              ) : (
                <img src='/images/empty_profile_pic.jpg' alt='No profile pic' />
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
