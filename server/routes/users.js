const express = require('express');
const bcrypt = require('bcryptjs');
let jwt  = require('jwt-simple');

const User = require('../models/User');

// use route
const router = express.Router();
module.exports = router;

//User login Route
router.post('/login', (req, res) => {
  const user = req.body;
  User.findOne({email: user.email})
    .then(exist => {
      if(exist) {
        //Match Password
        bcrypt.compare(user.password, exist.password, (err, isMatch) => {
          if(isMatch) {
            const token = jwt.encode(exist, 'secret');
            res.json({token: token, id :exist.id});
          } else {
            res.status(401).json('Password is not correct');
          }
        });
      } else {
        res.status(401).json('User not found!');
      }
    });
});

// Register prossece
router.post('/register', (req, res) => {
  // check if passwor is match
  if (req.body.password !== req.body.repassword) {
    res.status(401).json('Password dosent match');
  }

  // check if the user alrady registered
  User.findOne({email: req.body.email})
    .then(user =>{
      if (user) {
        res.status(409).json('email alrady registerd');
      } else {
        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            // Store hash in your password DB.
            newUser.password = hash;
            newUser.save()
              .then(user => {
                const token = jwt.encode(user, 'secret');
                res.json({token: token,id :user._id});
              })
              .catch(err => {
                console.log(err);
                return;
              });
          });
        });
      }
    });
});
