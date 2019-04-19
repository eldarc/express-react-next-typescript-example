import express from 'express'
import jwt from 'jsonwebtoken'

export function validateUser (req: express.Request, res: express.Response, next: any) {
  let token = ''
  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    token = req.headers.authorization.split(' ')[1]
  }

  jwt.verify(token, process.env.SECRET_KEY as string, (err: Error, decoded: Object) => {
    if (err) {
      res.status(401)
      res.send({
        key: 'UNAUTHORIZED'
      })
    } else {
      // @ts-ignore
      req.body.userId = decoded.id
      next()
    }
  })
}

export function informalUserValidation (req: express.Request, res: express.Response, next: any) {
  let token = ''
  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    token = req.headers.authorization.split(' ')[1]
  }

  jwt.verify(token, process.env.SECRET_KEY as string, (err: Error, decoded: Object) => {
    if (err) {
      next()
    } else {
      // @ts-ignore
      req.body.userId = decoded.id
      next()
    }
  })
}
