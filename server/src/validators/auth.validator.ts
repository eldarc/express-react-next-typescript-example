import { body } from 'express-validator/check'

export const usernameValidator = body('username').isLength({ min: 3 }).trim()
export const passwordValidator = (label: string = 'password') => {
  return body(label).isLength({ min: 5 })
}
