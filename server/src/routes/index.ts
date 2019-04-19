import express from 'express'
import authRoutes from './auth.routes'
import userRoutes from './user.routes'
import meRoutes from './me.routes'
import mostLikedRoutes from './mostLiked.routes'

export default function (app: express.Application) {
  // Ping endpoint.
  app.get('/ping', (req: express.Request, res: express.Response) => {
    res.send({
      pong: true
    })
  })

  // Routes
  app.use('/auth', authRoutes)
  app.use('/user', userRoutes)
  app.use('/me', meRoutes)
  app.use('/most-liked', mostLikedRoutes)
}
