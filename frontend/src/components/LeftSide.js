import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'
import { toggleDarkMode } from '../darkmode/darkmodeActions'
import { ReactComponent as ProfileSvg } from './images/man.svg'
import { ReactComponent as HomeSvg } from './images/house.svg'
import { ReactComponent as TelescopeSvg } from './images/telescope.svg'
import { IconButton } from '@material-ui/core'
import TwitterIcon from '@material-ui/icons/Twitter'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import Brightness4Icon from '@material-ui/icons/Brightness4'
import PostAddIcon from '@material-ui/icons/PostAdd'
import classNames from 'classnames'
import './styles/leftSide.scss'

const LeftSide = ({ history, post, logout, handleLogout }) => {
  const [dimensions, setDimensions] = useState({
    height: window.innerHeight,
    width: window.innerWidth,
  })
  useEffect(() => {
    function handleResize() {
      setDimensions({
        height: window.innerHeight,
        width: window.innerWidth,
      })
    }
    window.addEventListener('resize', handleResize)
    return (_) => {
      window.removeEventListener('resize', handleResize)
    }
  })

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
      {dimensions.width > 1285 ? (
        <>
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
            {darkMode ? (
              <div>Disable Dark Mode</div>
            ) : (
              <div>Enable Dark Mode</div>
            )}
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
        </>
      ) : dimensions.width > 700 ? (
        <>
          <Link to='/'>
            <IconButton>
              <TwitterIcon />
            </IconButton>
          </Link>
          <Link to='/'>
            <HomeSvg />
          </Link>
          <Link to='/profile'>
            <ProfileSvg />
          </Link>
          <Link to='/profiles'>
            <TelescopeSvg />
          </Link>
          <IconButton onClick={toggleDarkModeHandler} className='icons_main'>
            {darkMode ? (
              <Brightness4Icon style={{ height: 36, width: 36 }} />
            ) : (
              <Brightness4Icon style={{ height: 36, width: 36 }} />
            )}
          </IconButton>
          {post && (
            <IconButton
              onClick={() => history.push('/')}
              className='icons_main'>
              <PostAddIcon style={{ height: 36, width: 36 }} />
            </IconButton>
          )}
          {logout && (
            <IconButton onClick={handleLogout} className='icons_main'>
              <ExitToAppIcon style={{ height: 36, width: 36 }} />
            </IconButton>
          )}
        </>
      ) : (
        <div></div>
      )}
    </div>
  )
}

export default withRouter(LeftSide)
