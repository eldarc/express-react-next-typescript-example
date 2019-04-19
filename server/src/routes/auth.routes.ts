import express from 'express'
import { usernameValidator, passwordValidator } from '../validators/auth.validator'
import AuthController from '../controllers/auth.controller'

const auth = express.Router()

auth
    .post('/signup', [
      usernameValidator,
      passwordValidator()
    ], AuthController.signup)
    .post('/login', [
      usernameValidator,
      passwordValidator()
    ], AuthController.login)

export default auth
