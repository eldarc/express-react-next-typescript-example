import express from 'express'
import { validationResult } from 'express-validator/check'
import jwt from 'jsonwebtoken'
import { default as User, IUser } from '../models/user.model'
import logger from '../utils/logger'

class AuthController {
  static async signup (req: express.Request, res: express.Response) {
    // Find validation errors.
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(422).json({ key: 'SIGNUP_VALIDATION_ERROR', errors: errors.array() })
    }

    // Register user.
    const newUser = new User({
      username: req.body.username,
      password: req.body.password,
      likedBy: []
    })

    // Save the user in the database.
    try {
      const user: IUser = await newUser.save()

      // Login as the new user.
      const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY as string, { expiresIn: '24h' })

      // Success
      res.send({
        success: true,
        token
      })
    } catch (e) {
      // Error while signing up.
      logger.error(e)

      res.status(500)
      res.send({
        key: 'SIGNUP_DATABASE_ERROR'
      })
    }
  }

  static async login (req: express.Request, res: express.Response) {
    // Find validation errors.
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(422).json({ key: 'LOGIN_VALIDATION_ERROR', errors: errors.array() })
    }

    try {
      // Try to log in.
      const user = await User.findOne({ username: req.body.username })

      if (!user) {
        // User not found.
        logger.error('Username not found')

        res.status(403)
        res.send({
          key: 'LOGIN_WRONG_CREDENTIALS'
        })
      } else {
        // Compare candidate password and login if correct.
        // @ts-ignore: property exits
        const isMatch = await user.comparePassword(req.body.password)

        if (isMatch) {
          // Login as the verified user.
          const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY as string, { expiresIn: '24h' })

          res.send({
            success: true,
            token
          })
        } else {
          // User not found.
          logger.error('Password not correct')

          res.status(403)
          res.send({
            key: 'LOGIN_WRONG_CREDENTIALS'
          })
        }
      }
    } catch (e) {
      // Error while attempting to login.
      logger.error(e)

      res.status(500)
      res.send({
        key: 'LOGIN_ERROR'
      })
    }
  }
}

export default AuthController
