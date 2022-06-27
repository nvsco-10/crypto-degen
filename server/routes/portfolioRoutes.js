import express from 'express'
const router = express.Router()

import { getPortfolio, buyCoin, sellCoin } from '../controllers/portfolioController.js'

router.route('/')
  .get(getPortfolio)
  .patch(buyCoin)
  .delete(sellCoin)

export default router