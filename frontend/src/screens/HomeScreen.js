import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getMyProfile, getAllProfiles } from '../profile/profileActions'
import { logout } from '../user/userActions'
import { getPostsForHomePage } from '../post/postActions'
import { IconButton, OutlinedInput, InputBase } from '@material-ui/core'
import MoreIcon from '@material-ui/icons/More'
import {
  deletePostById,
  likePostById,
  commentPostById,
  deleteLikePostById,
  addPost,
} from '../post/postActions'
import './styles/home.scss'
import TwitterIcon from '@material-ui/icons/Twitter'

import Post from '../components/Post'
import { ReactComponent as NoPostSvg } from './images/undraw_Posts_re_ormv.svg'

import { ReactComponent as ProfileSvg } from './images/man.svg'
import { ReactComponent as HomeSvg } from './images/house.svg'
import { ReactComponent as TelescopeSvg } from './images/telescope.svg'
import { GET_PROFILE_RESET } from '../profile/profileConstants'
import { GET_MY_POST_RESET } from '../post/postConstants'

const HomeScreen = ({ history }) => {
  const dispatch = useDispatch()
  const [comment, setComment] = useState('')
  const [text, setText] = useState('')

  const getMyProfileValue = useSelector((state) => state.getMyProfile)
  const { error, profileInfo } = getMyProfileValue

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const getPostsForHomePageValue = useSelector(
    (state) => state.getPostsForHomePage
  )
  const { posts } = getPostsForHomePageValue

  const getAllProfilesValue = useSelector((state) => state.getAllProfiles)
  const { profiles } = getAllProfilesValue

  const deletePost = useSelector((state) => state.deletePost)
  const { success: successDelete } = deletePost

  const likePost = useSelector((state) => state.likePost)
  const { success: successLike } = likePost

  const deleteLikePost = useSelector((state) => state.deleteLikePost)
  const { success: successDeleteLike } = deleteLikePost

  const commentPost = useSelector((state) => state.commentPost)
  const { success: addCommentSuccess } = commentPost

  const addPostValues = useSelector((state) => state.addPost)
  const { success: addPostSuccess } = addPostValues

  useEffect(() => {
    if (error) {
      history.push('/createprofile')
    }
    if (!profileInfo) {
      dispatch(getMyProfile())
    }
    if (profiles.length === 0) {
      dispatch(getAllProfiles())
    }
    if (
      posts.length === 0 ||
      successLike ||
      successDeleteLike ||
      successDelete ||
      addCommentSuccess ||
      addPostSuccess
    ) {
      dispatch(getPostsForHomePage())
    }
  }, [
    dispatch,
    error,
    history,
    successLike,
    successDeleteLike,
    successDelete,
    addCommentSuccess,
    profileInfo,
    addPostSuccess,
  ])

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(getPostsForHomePage())
    }, 10000)
    return () => clearInterval(interval)
  }, [])

  const handleDeletePost = (id) => {
    dispatch(deletePostById(id))
  }

  const handleLikePost = (id) => {
    const post = posts.find((post) => post._id === id)
    const like = post.likes.find((like) => like.user === userInfo._id)
    if (like) {
      dispatch(deleteLikePostById(id))
    } else {
      dispatch(likePostById(id))
    }
  }

  const handleInputComment = (e) => {
    setComment(e.target.value)
  }
  const handleSubmitComment = (comment, id) => {
    dispatch(commentPostById(comment, id))
  }

  const handleAddPost = () => {
    dispatch(addPost(text))
    setText('')
  }
  const handleLogout = () => {
    dispatch(logout())
    dispatch({
      type: GET_PROFILE_RESET,
    })
    dispatch({
      type: GET_MY_POST_RESET,
    })
    history.push('/login')
  }

  return (
    <div className='content_container_home'>
      <div className='left_container_home'>
        <div className='list_container_home'>
          <div className='fixed_sidebar_profile_home'>
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

            <button onClick={handleLogout} className='btn-main'>
              logout
            </button>
          </div>
        </div>
      </div>
      <div className='right_container_home'>
        <div className='main_content_home'>
          <div className='main_content_left_home'>
            <div className='Home_Title_home'>
              <h3>Home</h3>
            </div>

            <div className='add_post_container'>
              <div className='profile_pic_post_container_home'>
                <div className='profile_pic_post_home'>
                  {profileInfo && profileInfo.avatar ? (
                    <img src={profileInfo.avatar} alt='No profil pic' />
                  ) : (
                    <img
                      src='/images/empty_profile_pic.jpg'
                      alt='No profil pic'
                    />
                  )}
                </div>
              </div>
              <div className='content_post_home'>
                <InputBase
                  autoFocus
                  value={text}
                  multiline={true}
                  onChange={(e) => setText(e.target.value)}
                  placeholder='What is happening?'
                  inputProps={{ 'aria-label': 'naked' }}
                />
                <button onClick={handleAddPost} className='btn-main'>
                  Post
                </button>
              </div>
            </div>
            <div className='empty_space_home_page'></div>
            <div className='posts_container_home'>
              {posts.length !== 0 && profileInfo ? (
                posts.map((post) => (
                  <Post
                    isLiked={post.isLiked}
                    OthersAvatar={post.avatar}
                    postUser={post.user}
                    myId={profileInfo.user._id}
                    key={post._id}
                    postId={post._id}
                    pseudo={post.pseudo}
                    handleLike={() => handleLikePost(post._id)}
                    handleDeletePost={() => handleDeletePost(post._id)}
                    handleInputComment={handleInputComment}
                    handleSubmitComment={() =>
                      handleSubmitComment(comment, post._id)
                    }
                    createdAt={post.createdAt}
                    name={post.name}
                    numberOfLikes={post.numberOfLikes}
                    numberOfComments={post.numberOfComments}>
                    {post.text}
                  </Post>
                ))
              ) : (
                <p className='no_post_container'>
                  <p>No posts</p>
                  <NoPostSvg />
                </p>
              )}
            </div>
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
              {profiles.slice(0, 5).map((profile) => (
                <Link key={profile._id} to={`/profile/${profile._id}`}>
                  {profile.avatar ? (
                    <img src={profile.avatar} alt='No profil pic' />
                  ) : (
                    <img
                      src='/images/empty_profile_pic.jpg'
                      alt='No profil pic'
                    />
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

export default HomeScreen
