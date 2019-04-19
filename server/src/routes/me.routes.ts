import express from 'express'
import { passwordValidator } from '../validators/auth.validator'
import MeController from '../controllers/me.controller'
import { validateUser } from '../middleware/validateUser.middleware'

const me = express.Router()

me
    .get('/', validateUser, MeController.details)
    .patch('/update-password', [
      validateUser,
      passwordValidator('currentPassword'),
      passwordValidator('newPassword')
    ], MeController.updatePassword)

export default me
