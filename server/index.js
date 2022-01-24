const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
var cookieParser = require('cookie-parser');
require('./passport')(passport);
const bcrypt = require('bcryptjs');
const User = require('./models/user');
const Flashcard = require('./models/flashcard');
const path = require('path');
mongoose.connect(process.env.MONGO_DB);

const app = express();
app.use(express.urlencoded({extended: true})); 
app.use(express.json());

app.use(cookieParser());
app.use(session({secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: true  }));
app.use(passport.initialize());
app.use(passport.session());


app.use(express.static(path.join(__dirname, '../build')));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

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
          res.send(JSON.stringify({ loggedIn: true, username: req.user.username }));
        })
      })
    })
  })
});

app.post('/flashcards/create', (req,res,next) =>{
  if(!req.user){
    return res.status(400); 
  }
  var flashcard = new Flashcard({
    cardFront: req.body.cardFront,
    cardBack: req.body.cardBack,
    cardDeck: req.body.cardDeck,
    owner: req.user.id,
  })
  flashcard.save(function(err){
    if(err) return next(err);
    res.send(JSON.stringify(flashcard))
  })
})

app.post('/flashcards/delete',(req,res,next) =>{
  if(!req.user) return res.status(400).json({ success: false, message: 'You are not logged in'}); 
  Flashcard.deleteOne({_id: req.body.cardId, owner: req.user._id}, function(err){
    if(err) return res.status(400).json({ success: false, message: 'There was an error when attempting to delete this flashcard'});
    res.send(JSON.stringify({success: true, message: 'Flashcard successfully deleted'}))
  })
})

app.post('/deck/edit', (req,res,next) =>{
  if(!req.user) return res.status(400).json({ success: false, message: 'You are not logged in'}); 
  Flashcard.updateMany({cardDeck: req.body.oldDeckName, owner: req.user._id}, {$set: {cardDeck: req.body.newDeckName}}, function(err){
    if(err) return res.status(400).json({ success: false, message: 'There was an error when attempting to update the deck name'});
    res.send(JSON.stringify({success: true, message: 'Deck successfully edited'}))
  })
})

app.post('/flashcards/edit',(req,res,next) =>{
  if(!req.user) return res.status(400).json({ success: false, message: 'You are not logged in'}); 
  Flashcard.findOneAndUpdate({_id: req.body.cardId, owner: req.user._id}, 
    {cardFront:req.body.cardFront, cardBack: req.body.cardBack, cardDeck: req.body.cardDeck},
    {new: true}, 
    function(err, card){
      if(err) return res.status(400).json({ success: false, message: 'There was an error when attempting to edit this flashcard'});
      res.send(JSON.stringify({success: true, card: card}))
  });
})

app.get('/flashcards/get', (req,res) =>{
  if(!req.user){
    return res.status(400); 
  }
  Flashcard.find({owner: req.user.id}).then(savedFlashcards =>{
    res.send(JSON.stringify({flashcards: savedFlashcards }));
  });
})

app.post('/login', passport.authenticate("local", {session: true, failWithError: true}),
  // Login success
  function(req,res,next){
    return res.send(JSON.stringify({ loggedIn: true, username: req.user.username }));
  },
  // Login fail
  function(err,req,res,next){
    let statusCode = err.status || 500;
    return res.status(statusCode).json({ loggedIn: false, formError: 'Login details are incorrect' })
  }
);

app.get('/logout', function(req,res){
  req.logout();
  res.redirect('/');
});

app.get('/user', function(req,res){
  if(req.user){
    res.send(JSON.stringify({ loggedIn: true, username: req.user.username }));
  }
  else{
    res.send(JSON.stringify({ loggedIn: false}));
  }
})

app.get('/api/greeting', (req, res) => {
  const name = req.query.name || 'World';
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({ greeting: `Hello ${name}!` }));
});

app.listen(process.env.PORT || 8008, () =>
  console.log('Express server is running on localhost:8008')
);