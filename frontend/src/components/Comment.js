import React from 'react'
import { useSelector } from 'react-redux'
import { IconButton } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import Linkify from 'react-linkify'
import classNames from 'classnames'
import './styles/comment.scss'

const Comment = ({
  written,
  handleDeleteComment,
  commentUser,
  myUser,
  name,
  pseudo,
  children,
  avatar,
}) => {
  const darkModeValue = useSelector((state) => state.darkMode)
  const { darkMode } = darkModeValue

  const commentStyle = classNames(
    'comment_container',
    'comment_container_light'
  )
  const commentStyleDark = classNames(
    'comment_container',
    'comment_container_dark'
  )

  return (
    <div className={darkMode ? commentStyleDark : commentStyle}>
      <div className='comment_pic_post_container'>
        <div className='comment_pic_post'>
          {avatar ? (
            <img src={avatar} alt='No profile pic' />
          ) : (
            <img src='/images/empty_profile_pic.jpg' alt='No profile pic' />
          )}
        </div>
      </div>
      <div className='content_post_comment'>
        <div className='delete_comment_post_container_aaa'>
          <div className='name_pseudo_post_container'>
            <p>{name} </p>
            {pseudo && <p>@{pseudo}</p>}
          </div>

          <div>
            {written && commentUser === myUser && (
              <IconButton onClick={handleDeleteComment}>
                <DeleteIcon />
              </IconButton>
            )}
          </div>
        </div>

        <Linkify>
          <p>{children}</p>
        </Linkify>
      </div>
    </div>
  )
}

export default Comment
