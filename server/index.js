const express = require('express');
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
var cookieParser = require('cookie-parser');
require('./passport')(passport);
const bcrypt = require('bcryptjs');
const User = require('./models/user');

dotenv.config();
mongoose.connect(process.env.mongoDB);

const app = express();
app.use(express.urlencoded({extended: true})); 
app.use(express.json());
app.use(pino);

app.use(cookieParser());
app.use(session({secret: 'abc', resave: false, saveUninitialized: true  }));
app.use(passport.initialize());
app.use(passport.session());

app.post('/signup', (req,res,next) =>{
  User.findOne({'username': req.body.username}).then(existingUser =>{
    if(existingUser) return res.status(400).json({ loggedIn: false, formError: 'Username is already in use' })
    bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
      if(err) return next(err);
      var user = new User({
        username: req.body.username,
        password: hashedPassword
      });
      user.save(function(err){
        if(err) return next(err);
        req.login(user, function(err){
          if(err) return next(err);
          res.setHeader('Content-Type', 'application/json');
          res.send(JSON.stringify({ loggedIn: true, username: req.user.username }));
        })
      })
    })
  })
});


app.post('/login', passport.authenticate("local", {session: true, failWithError: true}),
  function(req,res,next){
    console.log('pass')
    return res.send(JSON.stringify({ loggedIn: true, username: req.user.username }));
  },
  function(err,req,res,next){
    console.log('fail')
    let statusCode = err.status || 500;
    return res.status(statusCode).json({ loggedIn: false, formError: 'Login details are incorrect' })
  });

app.get('/logout', function(req,res){
  req.logout();
  res.redirect('/');
});

app.get('/user', function(req,res){
  console.log(req.user === undefined)
  if(req.user){
    res.send(JSON.stringify({ loggedIn: true, username: req.user.username }));
  }
  else{
    res.send(JSON.stringify({ loggedIn: false}));
  }
})

app.get('/api/greeting', (req, res) => {
  console.log(req.user)
  const name = req.query.name || 'World';
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({ greeting: `Hello ${name}!` }));
});

const Flashcard = require('./models/flashcard');

app.get('/flashcard', (req,res) =>{
  const f = req.query.name || '';
  var flashcard = new Flashcard({
    front_text: "poop",
    back_text : "more poop"
  })
  flashcard.save(function(err,flashcard){
    if (err) return next(err);
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(flashcard));
  })
})
/*
app.post('/flashcard', (req,res,next) =>{
  var flashcard = new Flashcard({
    front_text: "poop",
    back_text : "more poop"
  })
  flashcard.save(function(err,flashcard){
    if (err) return next(err);
    res.send(JSON.stringify(flashcard));
  })
})
*/

app.listen(3001, () =>
  console.log('Express server is running on localhost:3001')
);