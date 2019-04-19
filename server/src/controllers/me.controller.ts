import express from 'express'
import logger from '../utils/logger'
import User, { IUser } from '../models/user.model'
import { validationResult } from 'express-validator/check'
import jwt from 'jsonwebtoken'

class UserController {
  static async details (req: express.Request, res: express.Response) {
    try {
      const user = await User.findOne({ _id: req.body.userId }) as IUser

      res.send({
        _id: user._id,
        username: user.username,
        numberOfLikes: user.likedBy.length
      })
    } catch (e) {
        // Error while fetching user details.
      logger.error(e)

      res.status(500)
      res.send({
        key: 'FETCH_USER_DETAILS_ERROR'
      })
    }
  }

  static async updatePassword (req: express.Request, res: express.Response) {
    // Find validation errors.
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(422).json({ key: 'SIGNUP_VALIDATION_ERROR', errors: errors.array() })
    }

    try {
      // Get user.
      const user = await User.findOne({ _id: req.body.userId }) as IUser
      // @ts-ignore: property exits
      const isCurrentMatch = await user.comparePassword(req.body.currentPassword)

      if (!isCurrentMatch) {
        // User not found.
        logger.error('Password not correct')

        res.status(403)
        res.send({
          key: 'LOGIN_WRONG_CREDENTIALS'
        })
      } else {
        user.password = req.body.newPassword
        await user.save()

        // Login again.
        const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY as string, { expiresIn: '24h' })

        // Set token cooke.
        res.cookie('token', token, {
          maxAge: 86400000, // 24 hours
          httpOnly: true
        })

        // Success
        res.send({
          success: true
        })
      }
    } catch (e) {
      // Error while signing up.
      logger.error(e)

      res.status(500)
      res.send({
        key: 'UPDATE_PASSWORD_DATABASE_ERROR'
      })
    }
  }
}

export default UserController
