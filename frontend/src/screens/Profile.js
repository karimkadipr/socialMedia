import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getMyProfile, getAllProfiles } from '../profile/profileActions'
import { getMyPosts } from '../post/postActions'
import { IconButton, Button } from '@material-ui/core'
import LocationOnIcon from '@material-ui/icons/LocationOn'
import HttpIcon from '@material-ui/icons/Http'
import FaceIcon from '@material-ui/icons/Face'
import {
  deletePostById,
  likePostById,
  commentPostById,
  deleteLikePostById,
} from '../post/postActions'
import './styles/profile.scss'
import './styles/layout.scss'
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace'
import PhoneIcon from '@material-ui/icons/Phone'
import CakeIcon from '@material-ui/icons/Cake'
import Post from '../components/Post'
import dateFormat from 'dateformat'
import { ReactComponent as NoPostSvg } from './images/undraw_Posts_re_ormv.svg'
import { ReactComponent as TwitterBadgeSvg } from './images/twitter-verified-badge.svg'
import RightSide from '../components/RightSide'
import LeftSide from '../components/LeftSide'
import classNames from 'classnames'
import SideBar from '../components/SideBar'

const Profile = ({ history }) => {
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
  const dispatch = useDispatch()
  const [comment, setComment] = useState('')

  const getMyProfileValue = useSelector((state) => state.getMyProfile)
  const { error, profileInfo } = getMyProfileValue

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const getPost = useSelector((state) => state.getMyPosts)
  const { posts } = getPost

  const deletePost = useSelector((state) => state.deletePost)
  const { success: successDelete } = deletePost

  const likePost = useSelector((state) => state.likePost)
  const { success: successLike } = likePost

  const deleteLikePost = useSelector((state) => state.deleteLikePost)
  const { success: successDeleteLike } = deleteLikePost

  const commentPost = useSelector((state) => state.commentPost)
  const { success: addCommentSuccess } = commentPost

  const getAllProfilesValue = useSelector((state) => state.getAllProfiles)
  const { profiles } = getAllProfilesValue

  const darkModeValue = useSelector((state) => state.darkMode)
  const { darkMode } = darkModeValue

  const containerStyle = classNames(
    'content_container',
    'content_container_color_light'
  )

  const containerStyleDark = classNames(
    'content_container',
    'content_container_color_dark'
  )
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
    if (profiles && profiles.length === 0) {
      dispatch(getAllProfiles())
    }
    if (
      posts.length === 0 ||
      successLike ||
      successDeleteLike ||
      successDelete ||
      addCommentSuccess
    ) {
      dispatch(getMyPosts())
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
  ])

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
  return (
    <div className={darkMode ? containerStyleDark : containerStyle}>
      <div className='left_container'>
        {dimensions.width > 700 && (
          <div className='list_container'>
            <LeftSide post />
          </div>
        )}
      </div>
      <div className='right_container'>
        <div className='main_content'>
          <div className='main_content_left'>
            <div className='Home_Title'>
              {dimensions.width < 700 ? (
                <SideBar post />
              ) : (
                <Link onClick={() => history.goBack()}>
                  <IconButton>
                    <KeyboardBackspaceIcon />
                  </IconButton>
                </Link>
              )}

              <div>
                {profileInfo ? <h3>{profileInfo.user.name}</h3> : <h3></h3>}
                {posts ? (
                  <p> {posts.reduce((acc) => acc + 1, 0)} Posts</p>
                ) : (
                  <p></p>
                )}
              </div>
            </div>
            <div className='cover_container'>
              {profileInfo && profileInfo.coverImage && (
                <img
                  className='cover_image_itself'
                  src={profileInfo.coverImage}
                  alt='No profile pic'
                />
              )}
              <div className='profile_pic_container'>
                {profileInfo && profileInfo.avatar ? (
                  <img src={profileInfo.avatar} alt='No profile pic' />
                ) : (
                  <img
                    src='/images/empty_profile_pic.jpg'
                    alt='No profile pic'
                  />
                )}
              </div>
            </div>
            <div className='profile_info_container'>
              {profileInfo && (
                <>
                  <div className='name_button'>
                    <div className='name_pseudo_container'>
                      <p className='twitter_badge_with_name'>
                        {profileInfo.user.name}
                        {profileInfo.isVerified && (
                          <TwitterBadgeSvg className='twitter_verified_badge' />
                        )}
                      </p>
                      <p>@{profileInfo.user.pseudo}</p>
                    </div>
                    <Button
                      className='edit_profile_button'
                      onClick={() => {
                        history.push(`/editprofile`)
                      }}>
                      Edit profile
                    </Button>
                  </div>
                  <>
                    <div className='info_container_one'>
                      {profileInfo.location && (
                        <>
                          <span>
                            <LocationOnIcon />
                            {`${profileInfo.location.city} `}
                            {profileInfo.location.country}
                          </span>
                        </>
                      )}
                      {profileInfo.phone && (
                        <span>
                          <PhoneIcon />
                          {profileInfo.phone}
                        </span>
                      )}
                      {profileInfo.birthday.day && (
                        <span>
                          <CakeIcon />
                          {profileInfo.birthday.day}
                        </span>
                      )}
                      {profileInfo.birthday.month && (
                        <span>{profileInfo.birthday.month}</span>
                      )}
                      {profileInfo.birthday.year && (
                        <span>{profileInfo.birthday.year}</span>
                      )}
                      <span>
                        <span style={{ fontWeight: 700 }}>{`Joined . `}</span>
                        {dateFormat(profileInfo.createdAt, ' mmmm , yyyy')}
                      </span>
                    </div>
                    <div className='info_container_one'>
                      {profileInfo.bio && (
                        <span>
                          <FaceIcon />
                          {profileInfo.bio}
                        </span>
                      )}
                      {profileInfo.website && (
                        <a
                          style={{ color: '#1da1f2' }}
                          href={profileInfo.website}>
                          <HttpIcon />
                          {profileInfo.website}
                        </a>
                      )}
                    </div>
                    {profileInfo && (
                      <div
                        style={{ paddingTop: 8 }}
                        className='info_container_one'>
                        <span style={{ paddingRight: '1rem' }}>
                          <span style={{ fontWeight: '700', color: 'white' }}>
                            {profileInfo.subscriptions.length}
                          </span>
                          Following
                        </span>
                        <span>
                          <span style={{ fontWeight: '700', color: 'white' }}>
                            {profileInfo.subscribers.length}
                          </span>
                          Followers
                        </span>
                      </div>
                    )}
                  </>
                </>
              )}
            </div>
            <div className='posts_container'>
              {posts && posts.length !== 0 && profileInfo ? (
                posts.map((post) => (
                  <Post
                    isVerified={post.profile.isVerified}
                    createdAt={post.createdAt}
                    isLiked={post.isLiked}
                    myAvatar={profileInfo.avatar}
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

export default Profile
