import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getAnyPost, deleteCommentFromPost } from '../post/postActions'
import { getAllProfiles, getMyProfile } from '../profile/profileActions'
import { Collapse, IconButton } from '@material-ui/core'
import { Button, InputBase } from '@material-ui/core'

import {
  deletePostById,
  likePostById,
  commentPostById,
  deleteLikePostById,
  getCommentsPost,
} from '../post/postActions'
import Linkify from 'react-linkify'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import FavoriteIcon from '@material-ui/icons/Favorite'
import { GET_ANY_POST_RESET } from '../post/postConstants'
import ChatBubbleIcon from '@material-ui/icons/ChatBubble'
import ShareIcon from '@material-ui/icons/Share'
import DeleteIcon from '@material-ui/icons/Delete'
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace'
import { ReactComponent as TwitterBadgeSvg } from './images/twitter-verified-badge.svg'
import './styles/layout.scss'
import './styles/postDetails.scss'
import Comment from '../components/Comment'
import dateFormat from 'dateformat'
import RightSide from '../components/RightSide'
import LeftSide from '../components/LeftSide'
import classNames from 'classnames'
import SideBar from '../components/SideBar'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

const PostDetails = ({ history, match }) => {
  const [comment, setComment] = useState('')
  const [open, setOpen] = useState(false)
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

  const pseudo = match.params.pseudo
  const postId = match.params.postId

  const darkModeValue = useSelector((state) => state.darkMode)
  const { darkMode } = darkModeValue

  const containerStyle = classNames(
    'content_container_post',
    'content_container_post_color_light'
  )
  const containerStyleDark = classNames(
    'content_container_post',
    'content_container_post_color_dark'
  )

  const dispatch = useDispatch()

  const getMyProfileValue = useSelector((state) => state.getMyProfile)
  const { error, profileInfo } = getMyProfileValue

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const getAnyPostValue = useSelector((state) => state.getAnyPost)
  const { post } = getAnyPostValue

  const likePost = useSelector((state) => state.likePost)
  const { success: successLike } = likePost

  const deleteLikePost = useSelector((state) => state.deleteLikePost)
  const { success: successDeleteLike } = deleteLikePost

  const commentPost = useSelector((state) => state.commentPost)
  const { success: addCommentSuccess } = commentPost

  const getCommentsPostValues = useSelector((state) => state.getCommentsPost)
  const { comments } = getCommentsPostValues

  const getAllProfilesValue = useSelector((state) => state.getAllProfiles)
  const { profiles } = getAllProfilesValue

  const deleteComment = useSelector((state) => state.deleteComment)
  const { success: successDeleteComment } = deleteComment

  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    }
    if (error) {
      history.push('/createprofile')
    }
    if (!profileInfo) {
      dispatch(getMyProfile())
    }

    if (!post || !post.user) {
      dispatch(getAnyPost(pseudo, postId))
      dispatch(getCommentsPost(postId))
    }

    if (addCommentSuccess || successDeleteComment) {
      dispatch(getAnyPost(pseudo, postId))
      dispatch(getCommentsPost(postId))
    }
    if (successDeleteLike || successLike) {
      dispatch(getAnyPost(pseudo, postId))
    }
    if (profiles && profiles.length === 0) {
      dispatch(getAllProfiles())
    }
    return () => {
      localStorage.setItem('userComments', [])
    }
  }, [
    dispatch,
    error,
    history,
    postId,
    pseudo,
    addCommentSuccess,
    successDeleteLike,
    successLike,
    profileInfo,
    successDeleteComment,
  ])

  useEffect(() => {
    return () => {
      dispatch({
        type: GET_ANY_POST_RESET,
      })
    }
  }, [])

  const handleDeletePost = (id) => {
    dispatch(deletePostById(id))
    history.push('/profile')
  }

  const handleLikePost = (id) => {
    const like = post.likes.find((like) => like.user === userInfo._id)
    if (like) {
      dispatch(deleteLikePostById(id))
    } else {
      dispatch(likePostById(id))
    }
  }

  const handleSubmitComment = (comment, id) => {
    dispatch(commentPostById(comment, id))
    setOpen(false)
  }

  const handleDeleteComment = (id1, id2) => {
    dispatch(deleteCommentFromPost(id1, id2))
  }

  const handleKeypress = (e, comment, id) => {
    if (e.keyCode === 13) {
      handleSubmitComment(comment, id)
    }
  }

  return (
    <div className={darkMode ? containerStyleDark : containerStyle}>
      <div className='left_container_post'>
        {dimensions.width > 700 && (
          <div className='list_container_post'>
            <LeftSide post />
          </div>
        )}
      </div>
      <div className='right_container_post'>
        <div className='main_content_post'>
          <div className='main_content_left_post'>
            <div className='Home_Title_post'>
              {dimensions.width < 700 ? (
                <SideBar post />
              ) : (
                <Link onClick={() => history.goBack()}>
                  <IconButton>
                    <KeyboardBackspaceIcon />
                  </IconButton>
                </Link>
              )}
              <h3>Post</h3>
            </div>
            {post && profileInfo && post.profile ? (
              <>
                <div className='post_container_posts'>
                  <Link
                    to={`/profile/${post.profile._id}`}
                    className='profile_pic_and_name'>
                    {post.avatar ? (
                      <img src={post.avatar} alt='No profile pic' />
                    ) : (
                      <img
                        src='/images/empty_profile_pic.jpg'
                        alt='No profile pic'
                      />
                    )}
                    <div>
                      <p className='twitter_badge_with_name'>
                        {post.name}
                        {post.profile.isVerified && (
                          <TwitterBadgeSvg className='twitter_verified_badge' />
                        )}
                      </p>
                      <p>@{post.pseudo}</p>
                    </div>
                  </Link>
                  <div className='post_text_image_container'>
                    <Linkify>
                      <p>{post.text}</p>
                    </Linkify>
                  </div>
                  <div className='date_post'>
                    {dateFormat(
                      post.createdAt,
                      'dddd, mmmm dS, yyyy, h:MM:ss TT'
                    )}
                  </div>
                  <div className='likes_comments_number_post'>
                    <p>
                      <span>{post.numberOfLikes}</span> Likes
                    </p>
                    <p>
                      <span>{post.numberOfComments}</span> Comments
                    </p>
                  </div>
                  <div className='post_actions_post'>
                    <IconButton onClick={() => setOpen(!open)}>
                      <ChatBubbleIcon />
                    </IconButton>

                    <IconButton onClick={() => handleLikePost(post._id)}>
                      {post.isLiked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                    </IconButton>
                    {post.user === profileInfo.user._id ? (
                      <IconButton onClick={() => handleDeletePost(post._id)}>
                        <DeleteIcon />
                      </IconButton>
                    ) : (
                      <IconButton>
                        <ShareIcon />
                      </IconButton>
                    )}
                  </div>
                </div>

                <Collapse in={open}>
                  <Comment
                    isVerified={profileInfo.isVerified}
                    name={profileInfo.user.name}
                    pseudo={profileInfo.user.pseudo}
                    avatar={profileInfo.avatar}>
                    <div className='write_new_comment_post_screen'>
                      <InputBase
                        onKeyUp={(e) => handleKeypress(e, comment, postId)}
                        multiline={true}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder='Insert your comment'
                        inputProps={{ 'aria-label': 'naked' }}
                      />
                      <Button
                        className='button_add_comment_post_screen'
                        onClick={() => handleSubmitComment(comment, postId)}>
                        Submit
                      </Button>
                    </div>
                  </Comment>
                </Collapse>

                <TransitionGroup className='comments_section_post'>
                  {comments &&
                    comments.map((comment) => (
                      <CSSTransition
                        key={comment._id}
                        timeout={500}
                        classNames='comment-container'>
                        <Comment
                          isVerified={comment.isVerified}
                          written={true}
                          handleDeleteComment={() =>
                            handleDeleteComment(postId, comment._id)
                          }
                          key={comment._id}
                          commentUser={comment.user}
                          myUser={userInfo._id}
                          name={comment.name}
                          pseudo={comment.pseudo}
                          avatar={comment.avatar}>
                          {comment.text}
                        </Comment>
                      </CSSTransition>
                    ))}
                </TransitionGroup>
              </>
            ) : (
              <div>Post Does not exist</div>
            )}

            <div className='posts_container_post'></div>
          </div>
          <RightSide profiles={profiles} showMore />
        </div>
      </div>
    </div>
  )
}

export default PostDetails
