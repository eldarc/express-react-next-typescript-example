import { Logger, createLogger, format, transports } from 'winston'

const level = process.env.LOG_LEVEL || 'debug'

let logger: Logger

if (process.env.NODE_ENV === 'development') {
  logger = createLogger({
    exitOnError: false,
    level: level,
    format: format.combine(format.colorize(), format.simple()),
    transports: [new transports.Console()]
  })
} else {
  logger = createLogger({
    exitOnError: false,
    level: 'error',
    transports: [new transports.Console()]
  })
}

export default logger
