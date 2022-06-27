import express from 'express'
const router = express.Router()

import { addToPortfolio } from '../controllers/portfolioController.js'

router.route('/')
  .post(addToPortfolio)

export default router