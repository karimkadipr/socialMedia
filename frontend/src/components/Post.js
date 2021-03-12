import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { fromSeconds } from 'from-seconds'
import { IconButton, InputBase, Button } from '@material-ui/core'
import ChatBubbleIcon from '@material-ui/icons/ChatBubble'
import ShareIcon from '@material-ui/icons/Share'
import FavoriteIcon from '@material-ui/icons/Favorite'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import DeleteIcon from '@material-ui/icons/Delete'
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

  return (
    <div className='post_biggest_container'>
      <div>
        <Link to={`/${pseudo}/${postId}`} className='post_container'>
          <div className='profile_pic_post_container'>
            <div className='profile_pic_post'>
              {myAvatar ? (
                <img src={myAvatar} alt='No profil pic' />
              ) : OthersAvatar ? (
                <img src={OthersAvatar} alt='No profil pic' />
              ) : (
                <img src='/images/empty_profile_pic.jpg' alt='No profil pic' />
              )}
            </div>
          </div>
          <div className='content_post'>
            <p>
              <span>{name} </span>
              <span>@{pseudo}</span>
              <span>{timeToDisplay}</span>
            </p>
            <p>{children}</p>
          </div>
        </Link>
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

export default Post
