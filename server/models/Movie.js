const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//creat schema
const MovieSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  genre: {
    type: String,
  },
  user: {
    type: String,
    required: true
  },
  actor: {
    type: String
  },
  poster: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model('movie', MovieSchema);
