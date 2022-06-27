import User from '../models/User.js'
import Portfolio from '../models/Portfolio.js'
import { StatusCodes } from 'http-status-codes'
import { BadRequestError, UnauthenticatedError } from '../errors/index.js'

// async errors package handles try catch
const register = async (req, res) => {
  const { username, email, password } = req.body

  if ( !username || !email || !password){
    throw new BadRequestError('Please provide all values')
  }

  const emailExists = await User.findOne({email})
  if (emailExists) {
    throw new BadRequestError('Email already in use')
  }

  const usernameExists = await User.findOne({username})
  if (usernameExists) {
    throw new BadRequestError('Username already in use')
  }

  const user = await User.create(req.body)
  const token = user.createJWT()

  const portfolio = await Portfolio.create(
    {
      coins: {
        coinId: 'tether',
        qty: 0,
      },
      userId: user._id
    }
  )

  res.status(StatusCodes.CREATED).json({ 
    user: {
      _id: user._id,
      username: user.username,
      email: user.email,
    }, 
    token 
  })

}

const login = async (req,res) => {
  const { username, password } = req.body

  if( !username || !password ) {
    throw new BadRequestError('Please provide all values')
  }

  const user = await User.findOne({ username }).select('+password')
  if(!user) {
    throw new UnauthenticatedError('Invalid credentials')
  }

  const isPassword = await user.comparePassword(password)
  if(!isPassword) {
    throw new UnauthenticatedError('Invalid credentials')
  }

  const token = user.createJWT()

  // set pw to undefined so it's not included in response
  user.password = undefined
  res.status(StatusCodes.OK).json({ user, token })
}

const updateUser = async ({ body, params },res) => {

 const { username, email } = body

 if ( !username || !email ) {
   throw new BadRequestError('Please provide all values')
 }

 const user = await User.findOne({ _id: params.id })

 user.username = username
 user.email = email

 await user.save()


 res.status(StatusCodes.OK).json({ user })

}

const getAllUsers = async (req,res) => {
  const users = await User.find()
  
  res.status(StatusCodes.OK).json({ users })
}

const deleteUser = async ({ params },res) => {
  const deletedUser = await User.findOneAndDelete({ _id: params.id })

  if (!deletedUser) {
    throw new NotFoundError(`No user with id: ${params.id}`)
  }

  res.status(StatusCodes.OK).json({ msg: 'Success! User removed' })
}

export { register, login, updateUser, getAllUsers, deleteUser }