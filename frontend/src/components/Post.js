import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { fromSeconds } from 'from-seconds'
import { IconButton, InputBase, Button } from '@material-ui/core'
import ChatBubbleIcon from '@material-ui/icons/ChatBubble'
import ShareIcon from '@material-ui/icons/Share'
import FavoriteIcon from '@material-ui/icons/Favorite'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import DeleteIcon from '@material-ui/icons/Delete'
import Linkify from 'react-linkify'
import classNames from 'classnames'
import { ReactComponent as TwitterBadgeSvg } from './images/twitter-verified-badge.svg'
import './styles/post.scss'

const Post = ({
  myAvatar,
  OthersAvatar,
  children,
  name,
  isLiked,
  pseudo,
  postId,
  postUser,
  myId,
  numberOfLikes,
  numberOfComments,
  handleDeletePost,
  handleLike,
  handleInputComment,
  handleSubmitComment,
  createdAt,
  isVerified,
}) => {
  const [open, setOpen] = useState(false)

  let time = fromSeconds(
    Math.floor((Date.now() - new Date(createdAt)) / 1000)
  ).toYears()

  let yearsToDisplay = `${time.years}y `
  let monthsToDisplay = `${time.months}M `
  let daysToDisplay = `${time.days}d `
  let hoursToDisplay = `${time.hours}h `
  let minutesToDisplay = `${time.minutes}m `
  let secondsToDisplay = `${time.seconds}s `

  let timeToDisplay =
    ` . ` +
    (time.years !== 0 ? yearsToDisplay : '') +
    (time.months !== 0 ? monthsToDisplay : '') +
    (time.days !== 0 ? daysToDisplay : '') +
    (time.hours !== 0 ? hoursToDisplay : '') +
    (time.minutes !== 0 ? minutesToDisplay : '') +
    (time.seconds !== 0 ? secondsToDisplay : '')

  const openCloseComment = (open) => {
    setOpen(!open)
  }

  const handleSubmit = () => {
    handleSubmitComment()
    setOpen(false)
  }

  const handleKeypress = (e) => {
    if (e.keyCode === 13) {
      handleSubmit()
    }
  }

  const darkModeValue = useSelector((state) => state.darkMode)
  const { darkMode } = darkModeValue

  const postStyle = classNames(
    'post_biggest_container',
    'post_biggest_container_light'
  )
  const postStyleDark = classNames(
    'post_biggest_container',
    'post_biggest_container_dark'
  )

  return (
    <div className={darkMode ? postStyleDark : postStyle}>
      <div>
        <a href={`/${pseudo}/${postId}`} className='post_container'>
          <div className='profile_pic_post_container'>
            <div className='profile_pic_post'>
              {myAvatar ? (
                <img src={myAvatar} alt='No profile pic' />
              ) : OthersAvatar ? (
                <img src={OthersAvatar} alt='No profile pic' />
              ) : (
                <img src='/images/empty_profile_pic.jpg' alt='No profile pic' />
              )}
            </div>
          </div>
          <div className='content_post'>
            <p className='twitter_badge_with_name'>
              <span>{name}</span>
              {isVerified && (
                <TwitterBadgeSvg
                  className='twitter_verified_badge'
                  style={{ paddingRight: ' 0.5rem' }}
                />
              )}

              <span>
                @{pseudo}
                {timeToDisplay}
              </span>
            </p>
            <Linkify>
              <object className='text_of_the_post' type='owo/uwu'>
                {children}
              </object>
            </Linkify>
          </div>
        </a>
      </div>
      <div className='icons_post'>
        <div className='icon_post'>
          <IconButton onClick={() => openCloseComment(open)}>
            <ChatBubbleIcon />
          </IconButton>
          <IconButton
            className='span_in_button'
            onClick={() => openCloseComment(open)}>
            <span>{numberOfComments}</span>
          </IconButton>
        </div>

        <div className='icon_post'>
          <IconButton onClick={handleLike}>
            {isLiked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          </IconButton>
          <IconButton className='span_in_button' onClick={handleLike}>
            <span>{numberOfLikes}</span>
          </IconButton>
        </div>
        {postUser === myId ? (
          <div className='icon_post'>
            <IconButton onClick={handleDeletePost}>
              <DeleteIcon />
            </IconButton>
          </div>
        ) : (
          <div className='icon_post'>
            <IconButton>
              <ShareIcon />
            </IconButton>
          </div>
        )}
      </div>
      {open && (
        <div className='write_new_comment'>
          <InputBase
            onKeyUp={handleKeypress}
            multiline={true}
            onChange={(e) => handleInputComment(e)}
            placeholder='Insert your comment'
            inputProps={{ 'aria-label': 'naked' }}
          />
          <Button className='button_add_comment' onClick={handleSubmit}>
            Submit
          </Button>
        </div>
      )}
    </div>
  )
}

export default withRouter(Post)
