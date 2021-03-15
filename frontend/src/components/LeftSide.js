import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'
import { toggleDarkMode } from '../darkmode/darkmodeActions'
import { ReactComponent as ProfileSvg } from './images/man.svg'
import { ReactComponent as HomeSvg } from './images/house.svg'
import { ReactComponent as TelescopeSvg } from './images/telescope.svg'
import { IconButton } from '@material-ui/core'
import TwitterIcon from '@material-ui/icons/Twitter'
import classNames from 'classnames'
import './styles/leftSide.scss'

const LeftSide = ({ history, post, logout, handleLogout }) => {
  const darkModeValue = useSelector((state) => state.darkMode)
  const { darkMode } = darkModeValue

  const dispatch = useDispatch()

  const toggleDarkModeHandler = () => {
    dispatch(toggleDarkMode())
  }

  const leftStyle = classNames(
    'fixed_sidebar_profile',
    'fixed_sidebar_profile_light'
  )
  const leftStyleDark = classNames(
    'fixed_sidebar_profile',
    'fixed_sidebar_profile_dark'
  )

  return (
    <div className={darkMode ? leftStyleDark : leftStyle}>
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
      <button onClick={toggleDarkModeHandler} className='btn-main'>
        {darkMode ? <div>Disable Dark Mode</div> : <div>Enable Dark Mode</div>}
      </button>
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
