import mongoose from 'mongoose'
import passport from 'passport'
import passportLocal from 'passport-local'
import { authenticate } from '../auth/'

const User = mongoose.model('User')

passport.use(new passportLocal.Strategy({
  usernameField: 'username',
  passwordField: 'password',
}, authenticate))

passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())