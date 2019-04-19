import express from 'express'
import UserController from '../controllers/user.controller'
import { informalUserValidation, validateUser } from '../middleware/validateUser.middleware'

const user = express.Router()

user
    .get('/:id', informalUserValidation, UserController.details)
    .put('/:id/like', validateUser, UserController.like)
    .put('/:id/unlike', validateUser, UserController.unlike)

export default user
