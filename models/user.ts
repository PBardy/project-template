import crypto from 'crypto'
import jwt from 'jsonwebtoken'
import mongoose, { Schema, Document } from 'mongoose'
import passportLocalMongoose from 'passport-local-mongoose'

export interface IUser extends Document {

  username: String
  email: String
  firstName: String
  lastName: String

  hash: String
  salt: String

  setPassword(password: String)
  validPassword(password: String)

}

const schema = new Schema({

  username: {
    type: String,
    unique: true,
    required: true,
    index: true
  },

  email: {
    type: String,
    unique: true,
    required: true,
    match: [/\S+@\S+\.\S+/, 'is invalid'], 
    index: true
  },

  hash: {
    type: String,
    required: true,
  },

  salt: {
    type: String,
    require: true,
  },

  firstName: String,
  lastName: String,

})

schema.plugin(passportLocalMongoose)

schema.methods.setPassword = function(password) {
  this.salt = crypto.randomBytes(16).toString('hex')
  this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex')
}

schema.methods.validPassword = function(password) {
  const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex')
  return this.hash === hash
}

export default mongoose.model<IUser>('User', schema)
