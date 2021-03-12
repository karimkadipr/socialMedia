import asyncHandler from 'express-async-handler'
import Post from './postModel.js'
import User from '../user/userModel.js'
import Profile from '../profile/profileModel.js'

const addNewPost = asyncHandler(async (req, res) => {
  const userId = req.user
  const { text } = req.body
  const user = await User.findById(userId)
  const profile = await Profile.findOne({ user: userId })
  if (user) {
    const post = new Post({
      user: req.user,
      name: user.name,
      pseudo: user.pseudo,
      avatar: profile.avatar,
      profile: profile._id,
      text,
    })
    await post.save()
    res.json(post)
  } else {
    throw new Error('This user does not exist')
  }
})

const getMyPosts = asyncHandler(async (req, res) => {
  const userId = req.user
  const posts = await Post.find({ user: userId })
    .populate('User', 'id name')
    .sort({ createdAt: -1 })
  if (posts) {
    posts.map((post) => {
      if (post.likes.find((like) => like.user.equals(userId))) {
        post.isLiked = true
      } else {
        post.isLiked = false
      }
    })

    res.status(200).json(posts)
  } else {
    res.status(404)
    res.json('No posts found')
  }
})

const deletePostById = asyncHandler(async (req, res) => {
  const postId = req.params.id
  const userId = req.user

  const post = await Post.findById(postId)

  if (post && post.user.equals(userId)) {
    await post.remove()
    res.json('Post has been removed')
  } else {
    res.status(404)
    throw new Error('Post does not exist')
  }
})

const likeAPost = asyncHandler(async (req, res) => {
  const postId = req.params.id
  const userId = req.user

  const post = await Post.findById(postId)
  const user = await User.findById(userId)

  if (post && user) {
    if (post.likes.length !== 0) {
      const alreadyLiked = post.likes.find((like) => like.user.equals(userId))

      if (alreadyLiked) {
        throw new Error('already liked')
      } else {
        post.likes.unshift({
          user: userId,
          name: user.name,
          avatar: user.avatar,
        })
        post.numberOfLikes = Number(post.likes.length)
        await post.save()
        res.json(post)
      }
    } else {
      post.likes.unshift({ user: userId, name: user.name, avatar: user.avatar })
      post.numberOfLikes = post.likes.length
      await post.save()
      res.json(post)
    }
  } else {
    res.status(404)
    throw new Error('Post or user not found')
  }
})

const deletePostLike = asyncHandler(async (req, res) => {
  const postId = req.params.id
  const userId = req.user

  const post = await Post.findById(postId)
  const user = await User.findById(userId)

  if (post && user) {
    post.likes = post.likes.filter((like) => !like.user.equals(userId))
    post.numberOfLikes = post.likes.length
    await post.save()
    res.json(post)
  } else {
    res.status(404)
    throw new Error('Post or user not found')
  }
})

const addAComment = asyncHandler(async (req, res) => {
  const { text } = req.body
  const postId = req.params.id
  const userId = req.user

  const post = await Post.findById(postId)
  const user = await User.findById(userId)

  if (post && user) {
    post.comments.unshift({
      user: userId,
      pseudo: user.pseudo,
      text,
      name: user.name,
      avatar: user.avatar,
    })
    post.numberOfComments = post.comments.length
    const newPost = await post.save()
    res.json(newPost)
  } else {
    res.status(404)
    throw new Error('Post or user not found')
  }
})

const deleteAComment = asyncHandler(async (req, res) => {
  const postId = req.params.postId
  const commentId = req.params.commentId
  const userId = req.user

  const post = await Post.findById(postId)
  const user = await User.findById(userId)
  console.log(post.user.equals(userId))
  if (post && user) {
    post.comments = post.comments.filter(
      (comment) => !comment._id.equals(commentId)
    )
    post.numberOfComments = post.comments.length
    const newPost = await post.save()
    res.json(newPost)
  } else {
    res.status(404)
    throw new Error('Post or user not found')
  }
})

const getAnyPost = asyncHandler(async (req, res) => {
  const userId = req.user
  const pseudo = req.params.pseudo
  const postId = req.params.postId

  const post = await Post.findOne({ pseudo, _id: postId })

  if (post) {
    if (post.likes.find((like) => like.user.equals(userId))) {
      post.isLiked = true
    } else {
      post.isLiked = false
    }

    res.status(200).json(post)
  } else {
    res.status(404)
    res.json('Post does not exist')
  }
})

const getComments = asyncHandler(async (req, res) => {
  const postId = req.params.id
  const post = await Post.findById(postId)

  if (post) {
    res.status(200).json(post.comments)
  } else {
    res.status(404)
    throw new Error('post does not exist')
  }
})

const getPostsByProfile = asyncHandler(async (req, res) => {
  const profileId = req.params.id
  const userId = req.user
  const profile = await Profile.findById(profileId)
  const posts = await Post.find({ user: profile.user })
  if (posts) {
    posts.map((post) => {
      if (post.likes.find((like) => like.user.equals(userId))) {
        post.isLiked = true
      } else {
        post.isLiked = false
      }
    })
    res.status(200)
    res.json(posts)
  } else {
    res.status(404)
    throw new Error('profile does not exist')
  }
})

const getSubsPosts = asyncHandler(async (req, res) => {
  const userId = req.user
  const profile = await Profile.findOne({ user: userId })

  if (profile) {
    const subList = profile.subscriptions.map(
      (subscription) => subscription.user
    )
    const arrayUsersId = [...subList.map((sub) => ({ _id: sub }))]

    const arrayProfiles = Array.from(arrayUsersId, (x) => x._id)
    const profiles = await Profile.find({ _id: { $in: arrayProfiles } })

    const userProfileList = profiles.map((profile) => profile.user)

    const posts = await Post.find({ user: { $in: userProfileList } })
    posts.map((post) => {
      if (post.likes.find((like) => like.user.equals(userId))) {
        post.isLiked = true
      } else {
        post.isLiked = false
      }
    })
    const myPosts = await Post.find({ user: userId })
    myPosts.map((post) => {
      if (post.likes.find((like) => like.user.equals(userId))) {
        post.isLiked = true
      } else {
        post.isLiked = false
      }
    })
    const AllPosts = [...posts, ...myPosts].sort(function (a, b) {
      return new Date(b.createdAt) - new Date(a.createdAt)
    })
    res.json(AllPosts)
  } else {
    res.status(404)
    throw new Error('Profile Not found')
  }
})

const checkPostLike = asyncHandler(async (req, res) => {
  const postId = req.params.id
  const userId = req.user

  const postToCheck = await Post.findById(postId)

  if (postToCheck) {
    const findLike = postToCheck.likes.find((like) => like.user.equals(userId))
    if (findLike) {
      res.json(true)
    } else {
      res.json(false)
    }
  } else {
    res.status(404)
    throw new Error('Post does not exist')
  }
})

export {
  addNewPost,
  getMyPosts,
  deletePostById,
  likeAPost,
  deletePostLike,
  addAComment,
  deleteAComment,
  getAnyPost,
  getComments,
  getPostsByProfile,
  getSubsPosts,
  checkPostLike,
}
