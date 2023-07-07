const express = require('express');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const router = express.Router();
const User = require('../models/Users');
const roleAuthentication = require("../middlewares/roleAuth")

// Register a new user
router.post('/register', (req, res, next) => {
  const { username, password } = req.body;

  // Check if any field is empty
  if (!username || !password) {
    return res.status(400).json({ success: false, msg: 'Please fill in all fields' });
  }
  
  let newUser = new User({
    username: username,
    password: password
  });

  User.addUser(newUser)
    .then((user) => {
      res.json({ success: true, msg: 'User registered' });
    })
    .catch((error) => {
      res.json({ success: false, msg: 'Failed to register user' });
    });
});



// User login
router.post('/login', (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  User.getUserByUsername(username)
    .then((user) => {
      if (!user) {
        return res.json({ success: false, msg: 'User not found' });
      }

      User.comparePassword(password, user.password)
        .then((isMatch) => {
          if (isMatch) {
            const token = jwt.sign({ data: user }, process.env.SECRET_KEY, {
              expiresIn: 604800 // 1 week
            });
            res.json({
              success: true,
              msg: 'Login successful',
              token: `Bearer ${token}`,
              user: {
                id: user._id,
                name: user.name,
                username: user.username,
                role: user.role
              }
            });
          } else {
            return res.json({ success: false, msg: 'Wrong password' });
          }
        })
        .catch((error) => {
          console.error('An error occurred:', error);
          res.status(500).json({ message: 'Internal server error' });
        });
    })
    .catch((error) => {
      console.error('An error occurred:', error);
      res.status(500).json({ message: 'Internal server error' });
    });
});


// Protected route example
router.get('/dashboard', passport.authenticate('jwt', { session: false }), (req, res, next) => {
  // Access restricted to authenticated users with valid JWT token
  // You can access the authenticated user's information using req.user
  console.log("Icame to dashboard");
  const user = req.user;
  // Restrict access based on user role
  if (user.role === 'patient') {
    return res.json({ message: 'Welcome to the patient dashboard' });
  } else if (user.role === 'doctor') {
    return res.json({ message: 'Welcome to the doctor dashboard' });
  } else if (user.role === 'admin') {
    return res.json({ message: 'Welcome to the admin dashboard' });
  } else {
    return res.status(403).json({ message: 'Access denied' });
  }
});

// Profile
router.get('/profile', passport.authenticate('jwt', {session:false}),roleAuthentication(["admin",""]), (req, res, next) => {
  console.log("Icame to profile");
  res.json({user: req.user});
});

module.exports = router;
