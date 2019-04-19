import express from 'express'
import MostLikedController from '../controllers/mostLiked.controller'
import { informalUserValidation } from '../middleware/validateUser.middleware'

const mostLiked = express.Router()

mostLiked
    .get('/', informalUserValidation, MostLikedController.mostLiked)

export default mostLiked
