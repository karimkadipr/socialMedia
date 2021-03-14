import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getMyProfile, getAllProfiles } from '../profile/profileActions'
import { logout } from '../user/userActions'
import { getPostsForHomePage } from '../post/postActions'
import { InputBase } from '@material-ui/core'
import {
  deletePostById,
  likePostById,
  commentPostById,
  deleteLikePostById,
  addPost,
} from '../post/postActions'
import './styles/layout.scss'
import './styles/home.scss'
import Post from '../components/Post'
import { ReactComponent as NoPostSvg } from './images/undraw_Posts_re_ormv.svg'
import { GET_PROFILE_RESET } from '../profile/profileConstants'
import {
  GET_MY_POST_RESET,
  GET_POSTS_FOR_HOME_RESET,
} from '../post/postConstants'
import RightSide from '../components/RightSide'
import LeftSide from '../components/LeftSide'

const HomeScreen = ({ history }) => {
  const dispatch = useDispatch()
  const [comment, setComment] = useState('')
  const [text, setText] = useState('')

  const getMyProfileValue = useSelector((state) => state.getMyProfile)
  const { loading, profileInfo, error } = getMyProfileValue

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
    if (!profileInfo) {
      dispatch(getMyProfile())
    }
    if (error && profileInfo) {
      history.push('/createprofile')
    }
    if (!userInfo) {
      history.push('/login')
    }

    if (!profiles || (profiles && profiles.length === 0)) {
      dispatch(getAllProfiles())
    }
    if (
      (posts && posts.length === 0) ||
      !posts ||
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
    error,
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
    dispatch({
      type: GET_POSTS_FOR_HOME_RESET,
    })

    history.push('/login')
  }

  return (
    <div className='content_container'>
      <div className='left_container'>
        <div className='list_container'>
          <LeftSide logout handleLogout={handleLogout} />
        </div>
      </div>
      <div className='right_container'>
        <div className='main_content'>
          <div className='main_content_left'>
            <div className='Home_Title'>
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
              {posts && posts.length !== 0 && profileInfo ? (
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
          <RightSide profiles={profiles} showMore />
        </div>
      </div>
    </div>
  )
}

export default HomeScreen
