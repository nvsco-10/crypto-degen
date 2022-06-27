
import Portfolio from '../models/Portfolio.js'
import { StatusCodes } from 'http-status-codes'
import { BadRequestError, UnauthenticatedError } from '../errors/index.js'

const getPortfolio = async({ user }, res) => {
  // change to user.userId - 62b9ff669c025b3511e675a6
  const userPortfolio = await Portfolio.findOne({ userId: '62ba0b8b57058bc04e587164' }) 
  if ( !userPortfolio ) {
    throw new BadRequestError(`No portfolio or user found with user id: ${user.userId}`)
  }

  res.status(StatusCodes.OK).json({ userPortfolio })

}

// const depositTether = async({ body, user }, res) => {
//   const { qty } = body 

//   if( !qty ) {
//     throw new BadRequestError('Please provide a qty')
//   }

//   // change to user.userId - 62b9ff669c025b3511e675a6
//   const userPortfolio = await Portfolio.findOne({ userId: '62b9ff669c025b3511e675a6' }) 
//   if ( !userPortfolio ) {
//     throw new BadRequestError(`No portfolio or user found with user id: ${user.userId}`)
//   }


// }

const buyCoin = async({ body, user }, res) => {
  const { coinId, qty } = body

  if( !coinId ) {
    throw new BadRequestError('Please provide a coinId')
  }

  if( !qty ) {
    throw new BadRequestError('Please provide a qty')
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
    { userId: '62b9ff669c025b3511e675a6', "coins.coinId": coinId },
    { $set: { "coins.$.qty": newQty } },
    { runValidators: true, new: true }
  )


  res.status(StatusCodes.OK).json({ updatedPortfolio })
}

const sellCoin = async({ body, user }, res) => {
  const { coinId, qty } = body

  if( !coinId ) {
    throw new BadRequestError('Please provide a coinId')
  }

  if( !qty ) {
    throw new BadRequestError('Please provide a qty')
  }

  // change to user.userId - 62b9ff669c025b3511e675a6
  const userPortfolio = await Portfolio.findOne({ userId: '62b9ff669c025b3511e675a6' }) 
  if ( !userPortfolio ) {
    throw new BadRequestError(`No portfolio or user found with user id: ${user.userId}`)
  }

  const coinExists = userPortfolio.coins.find(coin => coin.coinId === coinId)

  if ( !coinExists ) {
    throw new BadRequestError(`No coin with id: ${coinId} in portfolio`)
  }

  const newQty = coinExists.qty - qty

  const updatedPortfolio = await Portfolio.findOneAndUpdate(
    { userId: '62b9ff669c025b3511e675a6', "coins.coinId": coinId },
    { $set: { "coins.$.qty": newQty } },
    { runValidators: true, new: true }
  )

  res.status(StatusCodes.OK).json({ updatedPortfolio })
}

export { getPortfolio, buyCoin, sellCoin }