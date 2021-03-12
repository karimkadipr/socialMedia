import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  getProfileById,
  getMyProfile,
  unFollowProfile,
  followProfile,
  isFollowProfile,
  getAllProfiles,
} from '../profile/profileActions'
import { IconButton, OutlinedInput, Button } from '@material-ui/core'
import LocationOnIcon from '@material-ui/icons/LocationOn'
import HttpIcon from '@material-ui/icons/Http'
import FaceIcon from '@material-ui/icons/Face'
import {
  deletePostById,
  likePostById,
  commentPostById,
  deleteLikePostById,
  getPostsByProfile,
} from '../post/postActions'
import './styles/profile.scss'
import TwitterIcon from '@material-ui/icons/Twitter'
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace'
import PhoneIcon from '@material-ui/icons/Phone'
import CakeIcon from '@material-ui/icons/Cake'
import {
  GET_PROFILE_BY_ID_RESET,
  ISFOLLOW_PROFILE_RESET,
} from '../profile/profileConstants'
import { GET_POSTS_BY_PROFILE_RESET } from '../post/postConstants'
import Post from '../components/Post'
import MoreIcon from '@material-ui/icons/More'
import dateFormat from 'dateformat'
import { ReactComponent as NoPostSvg } from './images/undraw_Posts_re_ormv.svg'
import { ReactComponent as ProfileSvg } from './images/man.svg'
import { ReactComponent as HomeSvg } from './images/house.svg'
import { ReactComponent as TelescopeSvg } from './images/telescope.svg'

const Profile = ({ history, match }) => {
  const profileId = match.params.id
  const dispatch = useDispatch()
  const [comment, setComment] = useState('')
  const [successState, setSuccessState] = useState(false)

  const getProfileByIdValue = useSelector((state) => state.getProfileById)
  const { error, profileInfo } = getProfileByIdValue

  const getMyProfileValue = useSelector((state) => state.getMyProfile)
  const { profileInfo: MyProfileInfo } = getMyProfileValue

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const getPostsByProfileValue = useSelector((state) => state.getPostsByProfile)
  const { posts, success: getPostsSuccess } = getPostsByProfileValue

  const likePost = useSelector((state) => state.likePost)
  const { success: successLike } = likePost

  const deleteLikePost = useSelector((state) => state.deleteLikePost)
  const { success: successDeleteLike } = deleteLikePost

  const commentPost = useSelector((state) => state.commentPost)
  const { success: addCommentSuccess } = commentPost

  const isFollowProfileValue = useSelector((state) => state.isFollowProfile)
  const { isFollowing } = isFollowProfileValue

  const getAllProfilesValue = useSelector((state) => state.getAllProfiles)
  const { profiles } = getAllProfilesValue

  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    }
    if (error) {
      history.push('/createprofile')
    }
    if (!MyProfileInfo) {
      dispatch(isFollowProfile(profileId))
      dispatch(getMyProfile())
    }
    if (!profileInfo) {
      dispatch(getProfileById(profileId))
      dispatch(isFollowProfile(profileId))
    }
    if (successState) {
      dispatch(getMyProfile())
      dispatch(getProfileById(profileId))
      setSuccessState(false)
    }
    if (profiles.length === 0) {
      dispatch(getAllProfiles())
    }
    if (
      posts.length === 0 ||
      addCommentSuccess ||
      successLike ||
      successDeleteLike
    ) {
      dispatch(getPostsByProfile(profileId))
    }
  }, [
    dispatch,
    error,
    history,
    profileInfo,
    profileId,
    MyProfileInfo,
    successState,
    getPostsSuccess,
    addCommentSuccess,
    successLike,
    successDeleteLike,
  ])

  useEffect(() => {
    return () => {
      dispatch({
        type: GET_PROFILE_BY_ID_RESET,
      })
      dispatch({
        type: GET_POSTS_BY_PROFILE_RESET,
      })
      dispatch({
        type: ISFOLLOW_PROFILE_RESET,
      })
    }
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

  const handleFollow = async () => {
    if (isFollowing.isFollowing) {
      await dispatch(unFollowProfile(profileId))
      await dispatch(isFollowProfile(profileId))
      await setSuccessState(true)
    } else {
      await dispatch(followProfile(profileId))
      await dispatch(isFollowProfile(profileId))
      await setSuccessState(true)
    }
  }

  const handleChangeLink = () => {
    dispatch({
      type: GET_PROFILE_BY_ID_RESET,
    })
  }

  return (
    <div className='content_container'>
      <div className='left_container'>
        <div className='list_container'>
          <div className='fixed_sidebar_profile'>
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
            <button onClick={() => history.push('/')} className='btn-main'>
              Post
            </button>
          </div>
        </div>
      </div>
      <div className='right_container'>
        <div className='main_content'>
          <div className='main_content_left'>
            <div className='Home_Title'>
              <Link onClick={() => history.goBack()}>
                <IconButton>
                  <KeyboardBackspaceIcon />
                </IconButton>
              </Link>
              <div>
                {profileInfo && <h3>{profileInfo.user.name}</h3>}
                {posts && <p> {posts.reduce((acc) => acc + 1, 0)} Posts</p>}
              </div>
            </div>
            <div className='cover_container'>
              {profileInfo && profileInfo.coverImage && (
                <img
                  className='cover_image_itself'
                  src={profileInfo.coverImage}
                  alt='No profil pic'
                />
              )}
              <div className='profile_pic_container'>
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
            <div className='profile_info_container'>
              {profileInfo && (
                <>
                  <div className='name_button'>
                    {profileInfo && profileInfo.user && (
                      <p>{profileInfo.user.name}</p>
                    )}

                    {MyProfileInfo && MyProfileInfo._id !== profileInfo._id && (
                      <div>
                        {isFollowing.isFollowing ? (
                          <Button
                            className='unfollow_button_profile'
                            variant='outlined'
                            onClick={() => handleFollow()}>
                            UnFollow
                          </Button>
                        ) : (
                          <Button
                            className='follow_button_profile'
                            variant='outlined'
                            onClick={() => handleFollow()}>
                            Follow
                          </Button>
                        )}
                      </div>
                    )}
                  </div>
                  <>
                    <div>
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
                    <div>
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
                          {' '}
                          <HttpIcon />
                          {profileInfo.website}
                        </a>
                      )}
                    </div>
                  </>
                </>
              )}
            </div>
            <div className='posts_container'>
              {posts.length !== 0 && profileInfo ? (
                posts.map((post) => (
                  <Post
                    createdAt={post.createdAt}
                    isLiked={post.isLiked}
                    myAvatar={profileInfo.avatar}
                    postUser={post.user}
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
                <div className='no_post_container'>
                  <p>No posts</p>
                  <NoPostSvg />
                </div>
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
                <Link
                  key={profile._id}
                  to={`/profile/${profile._id}`}
                  onClick={handleChangeLink}>
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

export default Profile
