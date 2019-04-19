import express from 'express'
import morgan from 'morgan'
import { connect as MongooseConnect } from 'mongoose'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import logger from './utils/logger'
import initRouter from './routes'

// Initialize environment.
require('custom-env').env(process.env.NODE_ENV === 'test' ? 'test' : undefined)

// Create a new express application instance.
const app: express.Application = express()

// Configure HTTP logging.
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev', {
    skip (req: express.Request, res: express.Response) {
      return res.statusCode < 400
    }, stream: process.stderr
  }))

  app.use(morgan('dev', {
    skip (req: express.Request, res: express.Response) {
      return res.statusCode >= 400
    }, stream: process.stdout
  }))
}

// Support JSON.
app.use(express.json())

// CORS
app.use(cors())
app.options('*', cors())

// Add cookie parser.
app.use(cookieParser())

// Initialize router.
initRouter(app)

// Connect to the database and start the server.
if (process.env.MONGODB_URI) {
  try {
    const MongoDbURI = process.env.MONGODB_URI || ''
    MongooseConnect(MongoDbURI, {
      useNewUrlParser: true
    }, () => {
      app.listen(process.env.SERVER_PORT, () => {
        logger.info(`Development server listening on port ${process.env.SERVER_PORT}!`)
      })
    })
  } catch (e) {
    logger.error(e)
  }
} else {
  logger.error('Server couldn\'t be started: MongoDB URI not defined.')
}

// Export the app.
export default app
