import mongoose from 'mongoose'

const profileSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      unique: true,
      ref: 'User',
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    avatar: {
      type: String,
    },
    coverImage: {
      type: String,
    },
    phone: {
      type: String,
      required: true,
    },
    birthday: {
      day: {
        type: Number,
        required: true,
      },
      month: {
        type: String,
        required: true,
      },
      year: {
        type: Number,
        required: true,
      },
    },
    location: {
      country: {
        type: String,
      },
      city: {
        type: String,
      },
    },
    numberOfSubscriptions: {
      type: Number,
      default: 0,
    },
    numberOfSubscribers: {
      type: Number,
      default: 0,
    },
    subscribers: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: 'User',
        },
        name: {
          type: String,
        },
        pseudo: {
          type: String,
        },
        avatar: {
          type: String,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    subscriptions: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: 'User',
        },
        name: {
          type: String,
        },
        pseudo: {
          type: String,
        },
        avatar: {
          type: String,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    bio: {
      type: String,
    },
    website: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
)

const Profile = mongoose.model('Profile', profileSchema)

export default Profile
