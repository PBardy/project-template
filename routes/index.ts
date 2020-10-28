import express from 'express'
import { checkAuthenticated, checkNotAuthenticated } from '../auth/'

const router = express.Router()

router.get('/', (req, res) => {
  res.render('pages/index')
})

export default router