import React from 'react'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'
import { ReactComponent as ProfileSvg } from './images/man.svg'
import { ReactComponent as HomeSvg } from './images/house.svg'
import { ReactComponent as TelescopeSvg } from './images/telescope.svg'
import { IconButton } from '@material-ui/core'
import TwitterIcon from '@material-ui/icons/Twitter'
import './styles/leftSide.scss'

const LeftSide = ({ history, post, logout, handleLogout }) => {
  return (
    <div className='fixed_sidebar_profile'>
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
      {post && (
        <button onClick={() => history.push('/')} className='btn-main'>
          Post
        </button>
      )}
      {logout && (
        <button onClick={handleLogout} className='btn-main'>
          logout
        </button>
      )}
    </div>
  )
}

export default withRouter(LeftSide)
