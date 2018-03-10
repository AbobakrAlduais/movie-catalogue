const express = require('express');

const Movie = require('../models/Movie');

// use route
const router = express.Router();
module.exports = router;

// Add Movie prossece
router.post('/add', (req, res) => {
  const newMovie = {
    title: req.body.title,
    genre: req.body.genre,
    user: req.body.userId,
    actor: req.body.actor,
    poster: req.body.poster
  };

  new Movie(newMovie)
    .save()
    .then( movie => {
      res.json({title: movie.title});
    });
});

// Get All for the user
router.get('/allMovies/:id', (req, res) => {
  Movie.find({user: req.params.id})
    .sort({date: 'desc'})
    .then (movies => {
      res.send(movies);
    })
    .catch( error => console.log(error));
});

// Filter movie
router.get('/search', (req,res) => {
  const category = req.query.category;
  const selector = req.query.selector;
  const userId = req.query.userId;
  const query = {};
  query[category] = selector;
  Movie.find({$and:[query, {user: userId}]})
    .sort({date: 'desc'})
    .then (movies => {
      res.send(movies);
    })
    .catch (error => console.log(error));
});

// get one movie
router.get('/getMovie/:id', (req, res) => {
  Movie.findOne({_id: req.params.id})
    .then(movie => {
      res.json(movie);
    })
    .catch(err => res.json(err));
});

// edit movie
router.put('/edit/:id', (req, res) => {
  Movie.findOne({_id:req.params.id})
    .then(movie => {
      movie.title = req.body.title;
      movie.actor = req.body.actor;
      movie.poster = req.body.poster;
      movie.genre =req.body.genre;

      movie.save();
    }).then(() => {
      res.json('movie updated');
    }).catch(() => res.json('movie did not update'));
});

// delete movie
router.delete('/delete/:id', (req, res) => {
  Movie.remove({_id: req.params.id})
    .then(() => {
      res.json('movie deleted');
    })
    .catch( err =>  console.log(err));
});
