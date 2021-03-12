import asyncHandler from 'express-async-handler'
import Profile from './profileModel.js'
import User from '../user/userModel.js'
import Post from '../posts/postModel.js'

const getMyProfile = asyncHandler(async (req, res) => {
  const userId = req.user
  const profile = await Profile.findOne({ user: userId }).populate(
    'user',
    'id name pseudo'
  )
  if (profile) {
    res.status(200).json(profile)
  } else {
    res.status(404)
    throw new Error('This profile does not exist')
  }
})

const createProfile = asyncHandler(async (req, res) => {
  const {
    phone,
    day,
    month,
    year,
    avatar,
    coverImage,
    website,
    bio,
    city,
    country,
  } = req.body

  const profile = new Profile({
    user: req.user,
    phone,
    birthday: {
      day,
      month,
      year,
    },
    avatar,
    coverImage,
    website,
    bio,
    location: {
      city,
      country,
    },
  })
  const profiler = await profile.save()
  res.json(profiler)
})

const updateProfile = asyncHandler(async (req, res) => {
  const userId = req.user
  const {
    name,
    pseudo,
    phone,
    country,
    city,
    bio,
    website,
    avatar,
    coverImage,
  } = req.body

  const profile = await Profile.findOne({ user: userId }).populate(
    'user',
    'id name pseudo'
  )
  const user = await User.findOne({ _id: req.user })
  const posts = await Post.find({ user: userId })

  if (user) {
    user.name = name || user.name
    user.pseudo = pseudo || user.pseudo
    await user.save()
  } else {
    throw new Error('user not found')
  }

  if (profile) {
    profile.user.name = name || profile.user.name
    profile.user.pseudo = pseudo || profile.user.pseudo
    profile.phone = phone || profile.phone
    profile.location.country = country || profile.location.country
    profile.location.city = city || profile.location.city
    profile.bio = bio || profile.bio
    profile.website = website || profile.website
    profile.avatar = avatar || profile.avatar
    profile.coverImage = coverImage || profile.coverImage

    await profile.save()
  } else {
    throw new Error('profile not found')
  }
  if (posts) {
    posts.map(
      (post) => (
        (post.name = user.name),
        (post.pseudo = user.pseudo),
        (post.avatar = profile.avatar)
      )
    )
    posts.map((post) =>
      post.likes.map(
        (like) => (
          (like.name = user.name),
          (like.pseudo = user.pseudo),
          (like.avatar = profile.avatar)
        )
      )
    )
    posts.map((post) =>
      post.comments.map(
        (comment) => (
          (comment.name = user.name),
          (comment.pseudo = user.pseudo),
          (comment.avatar = profile.avatar)
        )
      )
    )
    posts.map(asyncHandler(async (post) => await post.save()))
  }

  res.status(200).json(profile)
})

const getProfileById = asyncHandler(async (req, res) => {
  const profileId = req.params.id
  const profile = await Profile.findById(profileId).populate('user', 'id name')
  if (profile) {
    res.status(200).json(profile)
  } else {
    res.status(404)
    throw new Error('Profile does not exist')
  }
})

const deleteProfile = asyncHandler(async (req, res) => {
  const userId = req.user
  const profile = await Profile.findOne({ user: userId })
  if (profile) {
    await profile.remove()
    res.json('Profile has been deleted')
  } else {
    throw new Error('Profile does not exist')
  }
})

const followAProfile = asyncHandler(async (req, res) => {
  const userId = req.user
  const profileId = req.params.id

  const user = await User.findById(userId)
  const profileFollowing = await Profile.findOne({ user: user._id }).populate(
    'user',
    'id name pseudo '
  )
  const profileToFollow = await Profile.findById(profileId).populate(
    'user',
    'id name pseudo'
  )

  if (profileToFollow && profileToFollow) {
    profileToFollow.subscribers.unshift({
      user: profileFollowing._id,
    })

    profileToFollow.numberOfSubscribers = profileToFollow.subscribers.length
    profileToFollow.numberOfSubscriptions = profileToFollow.subscriptions.length

    profileFollowing.subscriptions.unshift({
      user: profileToFollow._id,
    })
    profileFollowing.numberOfSubscribers = profileFollowing.subscribers.length
    profileFollowing.numberOfSubscriptions =
      profileFollowing.subscriptions.length

    await profileToFollow.save()
    await profileFollowing.save()
    res.json('Profile followed')
  } else {
    res.status(404)
    throw new Error('Problem occured!')
  }
})

const unFollowAProfile = asyncHandler(async (req, res) => {
  const userId = req.user
  const profileId = req.params.id

  const user = await User.findById(userId)
  const profileFollowing = await Profile.findOne({ user: user._id }).populate(
    'user',
    'id name pseudo '
  )
  const profileToFollow = await Profile.findById(profileId).populate(
    'user',
    'id name pseudo'
  )

  if (profileToFollow && profileToFollow) {
    profileToFollow.subscribers = profileToFollow.subscribers.filter(
      (subscriber) => !subscriber.user.equals(profileFollowing._id)
    )

    profileToFollow.numberOfSubscribers = profileToFollow.subscribers.length
    profileToFollow.numberOfSubscriptions = profileToFollow.subscriptions.length

    profileFollowing.subscriptions = profileFollowing.subscriptions.filter(
      (subscription) => !subscription.user.equals(profileToFollow._id)
    )

    profileFollowing.numberOfSubscribers = profileFollowing.subscribers.length
    profileFollowing.numberOfSubscriptions =
      profileFollowing.subscriptions.length

    await profileToFollow.save()
    await profileFollowing.save()
    res.json('Profile Unfollowed')
  } else {
    res.status(404)
    throw new Error('Problem occured!')
  }
})

const getAllProfiles = asyncHandler(async (req, res) => {
  const userId = req.user
  let profiles = await Profile.find({}).populate(
    'user',
    'id name pseudo avatar'
  )

  if (profiles) {
    profiles = profiles.filter((profile) => !profile.user._id.equals(userId))
    res.status(200).json(profiles)
  } else {
    res.status(404)
    throw new Error('Error occured')
  }
})

const checkFollow = asyncHandler(async (req, res) => {
  const profileId = req.params.id
  const userId = req.user
  const myProfile = await Profile.findOne({ user: userId })
  const profileToCheck = await Profile.findById(profileId)

  if (myProfile && profileToCheck) {
    const findSubscriber = profileToCheck.subscribers.find((subscriber) =>
      subscriber.user.equals(myProfile._id)
    )
    if (findSubscriber) {
      res.json({ isFollowing: true })
    } else {
      res.json({ isFollowing: false })
    }
  } else {
    res.status(404)
    throw new Error('Profile does not exist')
  }
})

export {
  getMyProfile,
  createProfile,
  updateProfile,
  getProfileById,
  deleteProfile,
  followAProfile,
  unFollowAProfile,
  getAllProfiles,
  checkFollow,
}
