import mongoose from 'mongoose'
import { IUser } from '../models/user'

const User = mongoose.model('User')

export const checkAuthenticated = (req, res, next) => {
  if(req.isAuthenticated()) return next()
  res.redirect('/user/login')
}

export const checkNotAuthenticated = (req, res, next) => {
  if(!req.isAuthenticated()) return next()
  res.redirect('/user')
}

export const authenticate = (username: string, password: string, done) => {
  User.findOne({ username: username }).then((user:IUser) => {
    if(!user) return done(null, false)
    if(!user.validPassword(password)) return done(null, false)
    return done(null, user)
  })
}