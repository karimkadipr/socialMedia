import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getAnyPost, deleteCommentFromPost } from '../post/postActions'
import {
  getAllProfiles,
  getMyProfile,
  getProfileById,
} from '../profile/profileActions'
import { IconButton } from '@material-ui/core'
import { OutlinedInput, Button, InputBase } from '@material-ui/core'
import MoreIcon from '@material-ui/icons/More'
import {
  deletePostById,
  likePostById,
  commentPostById,
  deleteLikePostById,
  getCommentsPost,
} from '../post/postActions'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import FavoriteIcon from '@material-ui/icons/Favorite'
import { GET_ANY_POST_RESET } from '../post/postConstants'
import ChatBubbleIcon from '@material-ui/icons/ChatBubble'
import ShareIcon from '@material-ui/icons/Share'
import DeleteIcon from '@material-ui/icons/Delete'
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace'
import './styles/postDetails.scss'
import TwitterIcon from '@material-ui/icons/Twitter'
import Comment from '../components/Comment'
import dateFormat from 'dateformat'
import { ReactComponent as ProfileSvg } from './images/man.svg'
import { ReactComponent as HomeSvg } from './images/house.svg'
import { ReactComponent as TelescopeSvg } from './images/telescope.svg'

const PostDetails = ({ history, match }) => {
  const pseudo = match.params.pseudo
  const postId = match.params.postId

  const dispatch = useDispatch()
  const [comment, setComment] = useState('')
  const [open, setOpen] = useState('')

  const getMyProfileValue = useSelector((state) => state.getMyProfile)
  const { error, profileInfo } = getMyProfileValue

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const getAnyPostValue = useSelector((state) => state.getAnyPost)
  const { post } = getAnyPostValue

  /*   const getProfileByIdValue = useSelector(state => state.getProfileById)
  const {profileInfo : profileInfoById} = getProfileByIdValue */

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
    /*   if(!profileInfoById && post) {
      dispatch(getProfileById(post.user))
    } */
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

  return (
    <div className='content_container_post'>
      <div className='left_container_post'>
        <div className='list_container_post'>
          <div className='fixed_sidebar_profile_post'>
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
            <button className='btn-main'>Post</button>
          </div>
        </div>
      </div>
      <div className='right_container_post'>
        <div className='main_content_post'>
          <div className='main_content_left_post'>
            <div className='Home_Title_post'>
              <Link onClick={() => history.goBack()}>
                <IconButton>
                  <KeyboardBackspaceIcon />
                </IconButton>
              </Link>
              <h3>Post</h3>
            </div>
            {post && profileInfo ? (
              <>
                <div className='post_container_posts'>
                  <Link
                    to={`/profile/${post.profile}`}
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
                      <p>{post.name} </p>
                      <p>@{post.pseudo}</p>
                    </div>
                  </Link>
                  <div className='post_text_image_container'>
                    <p>{post.text}</p>
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
                {open && (
                  <div>
                    <Comment
                      name={userInfo.name}
                      pseudo={userInfo.pseudo}
                      avatar={post.avatar}>
                      <div className='write_new_comment_post_screen'>
                        <InputBase
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
                  </div>
                )}
                <div className='comments_section_post'>
                  {comments &&
                    comments.map((comment) => (
                      <Comment
                        written={true}
                        handleDeleteComment={() =>
                          handleDeleteComment(postId, comment._id)
                        }
                        key={comment._id}
                        commentUser={comment.user}
                        myUser={userInfo._id}
                        name={comment.name}
                        pseudo={comment.pseudo}
                        avatar={post.avatar}>
                        {comment.text}
                      </Comment>
                    ))}
                </div>
              </>
            ) : (
              <div>Post Does not exist</div>
            )}

            <div className='posts_container_post'></div>
          </div>
          <div className='main_content_right_home'>
            <div className='search_bar_home'>
              <OutlinedInput
                type='text'
                placeholder='Enter your Name'
                fullWidth={true}
              />
            </div>
            <div className='you_might_know_home'>
              <div className='who_to_follow'> Who to follow</div>
              {profiles &&
                profiles.slice(0, 5).map((profile) => (
                  <Link key={profile._id} to={`/profile/${profile._id}`}>
                    {profile.avatar ? (
                      <img src={profile.avatar} alt='No profil pic' />
                    ) : (
                      <img
                        src='/images/empty_profile_pic.jpg'
                        alt='No profil pic'
                      />
                    )}
                    <div>
                      <p>{profile.user.name}</p>
                      <p>@{profile.user.pseudo}</p>
                    </div>
                    <IconButton>
                      <MoreIcon />
                    </IconButton>
                  </Link>
                ))}
              <div className='who_to_follow'>
                <Link to='/profiles'>Show more</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PostDetails
