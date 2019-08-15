const express = require('express');
const session = require('express-session')
const uuid = require('uuid/v4')
const FileStore = require('session-file-store')(session)
const passport  = require('passport')
const bodyParser = require('body-parser')
const LocalStrategy = require('passport-local').Strategy;

user = {
  id: '123456', email: 'hello@hello.com', password: 'password'
}


passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  },
  (email ,password, done) => {
    if (email === user.email && password === user.password) {
      return done(null, user)
    } else {
      return done(null, false, {message: 'invalid credentials'})
    }
  }
))

passport.serializeUser((user, done) => {
  console.log('serrilazer call')
  done(null, user.id)
})

passport.deserializeUser((id, done) => {
  done(null, user)
})

const app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(session({
  genid: (req) => {
    console.log('req.sessionID = ', req.sessionID)
    return uuid()
  },
  store: new FileStore(),
  secret: 'hello',
  resave: false,
  saveUninitialized: true
}))

app.use(passport.initialize());
app.use(passport.session());

app.get('/' , (req, res) => {
  if (!req.isAuthenticated())
    return res.send('NOt authorized')
  console.log('///')
  res.send(`Welcome to Homepage ${req.sessionID}`)
})

app.post('/login', passport.authenticate('local') , (req, res) => {
  res.send('logged in')
})

app.listen(3000, () => {
  console.log('server is listening on port 3000')
})