import mongoose from 'mongoose'
import CoinSchema from './Coin.js'

const PortfolioSchema = new mongoose.Schema(
  {
    coins: [CoinSchema],
    userId: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
    }
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
    timestamps: true
  }
)

PortfolioSchema
  .virtual('coinCount')
  .get(function(){
    return this.coins.length
  })

export default mongoose.model('Portfolio', PortfolioSchema);