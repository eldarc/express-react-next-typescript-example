import { Schema, Document, model as Model } from 'mongoose'
import bcrypt from 'bcryptjs'
const SALT_WORK_FACTOR = 10

export interface IUser extends Document {
  username: string
  password: string,
  likedBy: IUser[]
}

const UserSchema: Schema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  likedBy: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }]
})

UserSchema.pre<IUser>('save', function (next) {
  const user: IUser = this

  // If the password is the same, don't save it.
  if (!user.isModified('password')) {
    return next()
  }

  // Generate hash for the new password.
  bcrypt.genSalt(SALT_WORK_FACTOR, (err: Error, salt: string) => {
    if (err) {
      return next(err)
    }

    // Hash and save.
    bcrypt.hash(user.password, salt, (err: Error, hash: string) => {
      if (err) {
        return next(err)
      }

      user.password = hash
      next()
    })
  })
})

// Compare if the provided password matches with the stored password.
UserSchema.methods.comparePassword = function (candidatePassword: string): Promise<boolean | Error> {
  return new Promise((resolve, reject) => {
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
      if (err) {
        reject(err)
      }

      resolve(isMatch)
    })
  })
}

export default Model<IUser>('User', UserSchema)
