import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import validator from 'validator'
import jwt from 'jsonwebtoken'

const UserSchema = new mongoose.Schema(
  {
  username: {
    type: String,
    required: [true, 'Please provide a username'],
    maxlength: 20,
    trim: true,
    unique: true,
  },
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    validate: {
      validator: validator.isEmail,
      message: 'Please provide a valid email',
    },
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 6,
    select: false,
  },
  portfolio: [portfolioItemSchema]
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
    timestamps: true
  }
)

// Schema to create portfolio item - not a mongoose model
const portfolioItemSchema = new mongoose.Schema(
  {
    // id from coingecko
    coinId: {
      type: String,
      ref: 'Coin' 
    },
    qty: {
      type: Number,
      default: 0,
      trim: true
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
    timestamps: true
  }
)

UserSchema.pre('save', async function () {
  // console.log(this.modifiedPaths())

  if (!this.isModified('password')) return

  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

UserSchema.methods.createJWT = function () {
  return jwt.sign({ userId: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  })
}

UserSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password)
}

export default mongoose.model('User', UserSchema)