import mongoose from 'mongoose'

const CoinSchema = new mongoose.Schema(
  {
    // id from coingecko
    coinId: {
      type: String,
      required: [true, 'Please provide a coinId'],
      trim: true,
    },
    qty: {
      type: Number,
      default: 0
    }
  }
)

export default CoinSchema