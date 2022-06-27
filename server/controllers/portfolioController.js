import User from '../models/User.js'
import Portfolio from '../models/Portfolio.js'
import { StatusCodes } from 'http-status-codes'
import { BadRequestError, UnauthenticatedError } from '../errors/index.js'

const addToPortfolio = async({ body, user }, res) => {
  const { coinId, qty } = body

  if( !coinId ) {
    throw new BadRequestError('Please provide a coinId')
  }

  // change to user.userId - 62b9ff669c025b3511e675a6
  const userPortfolio = await Portfolio.findOne({ userId: '62b9ff669c025b3511e675a6' }) 
  if ( !userPortfolio ) {
    throw new BadRequestError(`No portfolio or user found with user id: ${user.userId}`)
  }

  const coinExists = userPortfolio.coins.find(coin => coin.coinId === coinId)

  if ( !coinExists ) {
    const updatedPortfolio = await Portfolio.findOneAndUpdate(
      { userId: '62b9ff669c025b3511e675a6' },
      { $addToSet: { coins: body } },
      { runValidators: true, new: true }
    )

    res.status(StatusCodes.CREATED).json({ updatedPortfolio })
  }

  const newQty = coinExists.qty + qty

  const updatedPortfolio = await Portfolio.findOneAndUpdate(
    { userId: user.userId, "coins.coinId": coinId },
    { $set: { "coins.$.qty": newQty } },
    { runValidators: true, new: true }
  )


  res.status(StatusCodes.OK).json({ updatedPortfolio })
}

export { addToPortfolio }