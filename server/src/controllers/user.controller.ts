import express from 'express'
import logger from '../utils/logger'
import User, { IUser } from '../models/user.model'

class UserController {
  static async details (req: express.Request, res: express.Response) {
    try {
      const user = await User.findOne({ _id: req.params.id }) as IUser

      res.send({
        _id: user._id,
        username: user.username,
        numberOfLikes: user.likedBy.length,
        featuredLikes: user.likedBy.filter((item) => item.equals(req.body.userId))
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

  static async like (req: express.Request, res: express.Response) {
    if (req.body.userId === req.params.id) {
      // Cant like self.
      logger.error('Can\'t like self')
      res.status(403)
      res.send({
        key: 'ERROR_LIKE_SELF'
      })
    }

    try {
      // Fetch users.
      const user = await User.findOne({ _id: req.params.id }) as IUser
      const likedBy = await User.findOne({ _id: req.body.userId }) as IUser

      // Add like.
      const alreadyLiked = user.likedBy.find(id => {
        return id.equals(likedBy._id)
      })

      if (alreadyLiked) {
        // User already liked.
        logger.error('User is already liked')

        res.status(500)
        res.send({
          key: 'ALREADY_LIKED_ERROR'
        })
      } else {
        user.likedBy.push(likedBy)

        // Save like.
        await user.save()

        // Send success.
        res.send({
          success: true
        })
      }
    } catch (e) {
      // Error while liking.
      logger.error(e)

      res.status(500)
      res.send({
        key: 'LIKE_ERROR'
      })
    }
  }

  static async unlike (req: express.Request, res: express.Response) {
    try {
      // Fetch users.
      const user = await User.findOne({ _id: req.params.id }) as IUser
      const likedBy = await User.findOne({ _id: req.body.userId }) as IUser

      // Find like.
      const alreadyLikedIndex = user.likedBy.findIndex(id => {
        return id.equals(likedBy._id)
      })

      if (alreadyLikedIndex !== undefined) {
        // Remove like.
        user.likedBy.splice(alreadyLikedIndex, 1)

        // Save unlike.
        await user.save()
      }

      // Send success.
      res.send({
        success: true
      })
    } catch (e) {
      // Error while unliking.
      logger.error(e)

      res.status(500)
      res.send({
        key: 'UNLIKE_ERROR'
      })
    }
  }
}

export default UserController
