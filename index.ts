// Import models (so they're registered)
// ...
import './models/user'

// Import general modules
// ...
import './configs'
import path from 'path'

// Import express and its middleware
// ...
import express from 'express'
import passport from 'passport'
import flash from 'express-flash'
import session from 'express-session'
import methodOverride from 'method-override'

// Import routes
// ...
import indexRouter from './routes/index'

// Create app instance
// ...
const app = express()
const port:String = process.env.PORT || '3000'

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '/views'))

// Define what middleware to use
// ...
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}))

app.use(flash())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'static')))
app.use(methodOverride('_method'))

// Define routes
// ...
app.use('/', indexRouter)

// Listen on port
// ...
app.listen(port, () => {
  console.log('http://localhost:' + port)
})