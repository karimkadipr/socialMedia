import React, { useState, useEffect, useRef } from 'react'
import { CSSTransition } from 'react-transition-group'
import './styles/SideBar.scss'
import { Link } from 'react-router-dom'
import ListIcon from '@material-ui/icons/List'
import { withRouter } from 'react-router-dom'
import { ReactComponent as ProfileSvg } from './images/man.svg'
import { ReactComponent as HomeSvg } from './images/house.svg'
import { ReactComponent as TelescopeSvg } from './images/telescope.svg'
import { IconButton } from '@material-ui/core'
import TwitterIcon from '@material-ui/icons/Twitter'
import { useSelector, useDispatch } from 'react-redux'
import { toggleDarkMode } from '../darkmode/darkmodeActions'
import classNames from 'classnames'

function SideBar({ history, post, logout, handleLogout }) {
  const [open, setOpen] = useState(false)

  const DropRef = useRef()

  function handleClickOutside(event) {
    if (DropRef.current && !DropRef.current.contains(event.target)) {
      setOpen(() => false)
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return function cleanup() {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const darkModeValue = useSelector((state) => state.darkMode)
  const { darkMode } = darkModeValue

  const dispatch = useDispatch()

  const toggleDarkModeHandler = () => {
    dispatch(toggleDarkMode())
  }

  const sideBarStyle = classNames('SideMenu', 'SideMenu_light')
  const sideBarStyleDark = classNames('SideMenu', 'SideMenu_dark')

  function DropItem(props) {
    return (
      <div href='#' className='side-menu-item'>
        {props.children}
      </div>
    )
  }

  return (
    <div ref={DropRef}>
      <div
        onClick={() => {
          setOpen((open) => !open)
        }}>
        <ListIcon className='drop_menu_icon' />
      </div>
      <CSSTransition
        in={open === true}
        timeout={300}
        classNames='side-bar'
        unmountOnExit>
        <div className={darkMode ? sideBarStyleDark : sideBarStyle}>
          <DropItem>
            <Link to='/'>
              <IconButton>
                <TwitterIcon style={{ margin: 0 }} />
              </IconButton>
            </Link>
          </DropItem>
          <DropItem goToMenu='settings'>
            <Link to='/'>
              <HomeSvg /> Home
            </Link>
          </DropItem>
          <DropItem goToMenu='animals'>
            <Link to='/profile'>
              <ProfileSvg /> Profile
            </Link>
          </DropItem>
          <DropItem goToMenu='animals'>
            <Link to='/profiles'>
              <TelescopeSvg /> Discover
            </Link>
          </DropItem>
          <DropItem>
            <button onClick={toggleDarkModeHandler} className='btn-main'>
              {darkMode ? (
                <div>Disable Dark Mode</div>
              ) : (
                <div>Enable Dark Mode</div>
              )}
            </button>
          </DropItem>

          {post && (
            <DropItem>
              <button onClick={() => history.push('/')} className='btn-main'>
                Post
              </button>
            </DropItem>
          )}
          {logout && (
            <DropItem>
              <button onClick={handleLogout} className='btn-main'>
                logout
              </button>{' '}
            </DropItem>
          )}
        </div>
      </CSSTransition>
    </div>
  )
}

export default withRouter(SideBar)
