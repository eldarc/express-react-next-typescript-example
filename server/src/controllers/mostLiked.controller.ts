import express from 'express'
import logger from '../utils/logger'
import User, { IUser } from '../models/user.model'
import { mongo } from 'mongoose'

class MostLikedController {
  static async mostLiked (req: express.Request, res: express.Response) {
    try {
      const users = await User.aggregate([
        {
          $project: {
            username: 1,
            numberOfLikes: { $size: '$likedBy' },
            featuredLikes: {
              $filter: {
                input: '$likedBy',
                as: 'item',
                cond: { $eq: ['$$item', new mongo.ObjectID(req.body.userId)] }
              }
            }
          }
        },
        {
          $sort: { numberOfLikes: -1 }
        }
      ])

      res.send(users)
    } catch (e) {
        // Error while fetching user details.
      logger.error(e)

      res.status(500)
      res.send({
        key: 'FETCH_MOST_LIKED_ERROR'
      })
    }
  }
}

export default MostLikedController
