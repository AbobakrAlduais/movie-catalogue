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
    image: req.body.image
  };

  new Movie(newMovie)
    .save()
    .then( movie => {
      res.json({title: movie.title});
    });
});

router.get('/allMovies/:id', (req, res) => {
  Movie.find({user: req.params.id})
    .sort({date: 'desc'})
    .then (movies => {
      res.send(movies);
    })
    .catch( error => console.log(error));
});

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

// router.put('/edit/:id', (req, res) => {
//   Idea.findOne({_id:req.params.id})
//     .then(movie => {

//     })
// })
